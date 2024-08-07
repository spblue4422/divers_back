import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInResDto } from './dtos/signInRes.dto';
import { ConfigService } from '@nestjs/config';
import { UserSignUpReqDto } from './dtos/userSignUpReq.dto';
import { UserService } from '../user/user.service';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { InsertResult } from 'typeorm';
import { SignInReqDto } from './dtos/signInReq.dto';
import { DiveShopService } from '../diveShop/diveShop.service';
import { ShopSignUpReqDto } from './dtos/shopSignUpReq.dto';
import { DiversException } from 'src/common/exceptions';
import { JwtAccessPayloadDto } from 'src/common/dtos/jwtPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly diveShopService: DiveShopService,
  ) {}

  //configService에서 주입
  private secret = this.configService.get<string>('SECRETKEY');
  private access_expired = this.configService.get<string>('ACCESS_EXPIRED');
  private refresh_expired = this.configService.get<string>('REFRESH_EXPIRED');

  async signIn(signInBody: SignInReqDto): Promise<SignInResDto> {
    const { loginId, password } = signInBody;
    //존재하는 계정인지 확인
    const { id, isBanned, salt, role } =
      await this.authRepository.findOneByLoginIdOrFail(loginId);

    // 밴 당한 계정인지 확인
    if (isBanned) throw new DiversException('BANNED_USER');

    //비밀번호 암호화 검증
    const encrypted = await bcrypt.hash(password, salt);

    if (bcrypt.compare(password, encrypted)) {
      const accessToken = await this.jwtService.signAsync(
        { authId: id, loginId, role },
        { secret: this.secret, expiresIn: this.access_expired },
      );

      const refreshToken = await this.jwtService.signAsync(
        { authId: id },
        { secret: this.secret, expiresIn: this.refresh_expired },
      );

      await this.authRepository.save({ id, refreshToken });

      return SignInResDto.signInSuccess(accessToken, refreshToken);
    } else throw new DiversException('WRONG_ID_PW'); // 틀린 비밀번호
  }

  // 유저 로그인
  async userSignIn(signInBody: SignInReqDto): Promise<SignInResDto> {
    const { loginId, password } = signInBody;

    // 존재하는 계정인지 확인
    const { id, isBanned, salt, role } =
      await this.authRepository.findOneByLoginIdOrFail(loginId);

    // 밴 여부 확인
    if (isBanned) throw new DiversException('BANNED_USER');

    // 비밀번호 암호화 검증
    const encrypted = await bcrypt.hash(password, salt);

    if (bcrypt.compare(password, encrypted)) {
      const { id: userId } = await this.userService.getUserWithAuth(id);

      // accessToken
      const accessToken = await this.jwtService.signAsync(
        { authId: id, userShopId: userId, role },
        { secret: this.secret, expiresIn: this.access_expired },
      );

      // refreshToken
      const refreshToken = await this.jwtService.signAsync(
        { authId: id },
        { secret: this.secret, expiresIn: this.refresh_expired },
      );

      // save refreshToken in database
      await this.authRepository.save({ id, refreshToken });

      return SignInResDto.signInSuccess(accessToken, refreshToken);
    } else throw new DiversException('WRONG_ID_PW'); // 틀린 비밀번호
  }

  // async shopSignIn(signInBody: SignInReqDto): Promise<SignInResDto> {
  //   const { loginId, password } = signInBody;
  //   //존재하는 계정인지 확인
  //   const { id, isBanned, salt, role } =
  //     await this.authRepository.findOneByLoginIdOrFail(loginId);

  //   // 밴 당한 계정인지 확인
  //   if (isBanned) throw new DiversException('BANNED_USER');

  //   //비밀번호 암호화 검증
  //   const encrypted = await bcrypt.hash(password, salt);

  //   if (bcrypt.compare(password, encrypted)) {
  //     const { id: userId } = await this.diveShopService.getMyDiveShop()

  //     const accessToken = await this.jwtService.signAsync(
  //       { authId: id, loginId, userId, role },
  //       { secret: this.secret, expiresIn: this.access_expired },
  //     );

  //     const refreshToken = await this.jwtService.signAsync(
  //       { authId: id },
  //       { secret: this.secret, expiresIn: this.refresh_expired },
  //     );

  //     await this.authRepository.save({ id, refreshToken });

  //     return SignInResDto.signInSuccess(accessToken, refreshToken);
  //   } else throw new DiversException('WRONG_ID_PW'); // 틀린 비밀번호
  // }

  async userSignUp(signUpBody: UserSignUpReqDto): Promise<MsgResDto> {
    const { loginId, password, createUserBody } = signUpBody;

    // auth 만들기
    const result: InsertResult = await this.createAuth(loginId, password, 0);

    // 만든 auth에 해당하는 user 만들어주기
    await this.userService.createUser(result.identifiers[0].id, createUserBody);

    return MsgResDto.success();
  }

  // shop signup의 경우 바로 회원가입이 아니라 인증 절차를 거쳐야함. 인증 신청 목록을 볼 수 있게끔 해야한다.
  async shopSignUp(signUpBody: ShopSignUpReqDto): Promise<MsgResDto> {
    const { loginId, password, createShopBody } = signUpBody;

    const result: InsertResult = await this.createAuth(loginId, password, 1);

    // createDiveShop에 인증 신청하는 로직까지 한번에 들어가있음.
    await this.diveShopService.createDiveshop(
      result.identifiers[0].id,
      createShopBody,
    );

    return MsgResDto.success();
  }

  async signOut(authId: number): Promise<MsgResDto> {
    await this.authRepository.save({ id: authId, refreshToken: null });

    return MsgResDto.success();
  }

  async checkLoginIdDuplicate(loginId: string): Promise<MsgResDto> {
    if (await this.authRepository.exists({ where: { loginId } }))
      throw new DiversException('DUPLICATE_LOGIN_ID');

    return MsgResDto.success();
  }

  async accessRefresh(refreshToken: string) {
    if (!refreshToken) throw new DiversException('NO_REFRESHTOKEN');

    const { authId } = await this.jwtService
      .verifyAsync(refreshToken)
      .catch(() => {
        throw new DiversException('INVALID_TOKEN');
      });

    const { id: userId, auth } = await this.userService.getUserWithAuth(authId);
    const { role, refreshToken: savedRefresh } = auth;

    if (refreshToken != savedRefresh)
      throw new DiversException('INVALID_TOKEN');

    const newAccessToken = await this.signToken({
      authId,
      userShopId: userId,
      role,
    });

    const newRefreshToken = await this.signToken({ authId });

    await this.authRepository.save({
      id: authId,
      refreshToken: newRefreshToken,
    });

    return SignInResDto.signInSuccess(newAccessToken, newRefreshToken);
  }

  async createAuth(loginId: string, password: string, role: number) {
    const salt = await bcrypt.genSalt();
    const encrypted = await bcrypt.hash(password, salt);

    return this.authRepository.insert({
      loginId,
      salt,
      password: encrypted,
      // 0 - user, 1 - shop, 888 - admin
      // 나중에 enum 로직 넣든지 하자
      role,
    });
  }

  async signToken(data: object): Promise<string> {
    if (data instanceof JwtAccessPayloadDto)
      return this.jwtService.signAsync(data, {
        secret: this.secret,
        expiresIn: this.access_expired,
      });
    else
      return this.jwtService.signAsync(data, {
        secret: this.secret,
        expiresIn: this.refresh_expired,
      });
  }
}
