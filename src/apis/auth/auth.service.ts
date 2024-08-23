import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthReqDto } from './dtos/createAuthReq.dto';
import { AuthRepository } from '@/apis/auth/auth.repository';
import { ShopSignUpReqDto } from '@/apis/auth/dtos/shopSignUpReq.dto';
import { SignInReqDto } from '@/apis/auth/dtos/signInReq.dto';
import { SignInResDto } from '@/apis/auth/dtos/signInRes.dto';
import { UserSignUpReqDto } from '@/apis/auth/dtos/userSignUpReq.dto';
import { DiveShopService } from '@/apis/diveShop/diveShop.service';
import { UserService } from '@/apis/user/user.service';
import {
  JwtAccessPayloadDto,
  JwtRefreshPayloadDto,
} from '@/common/dtos/jwtPayload.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { Role } from '@/common/enums';
import { DiversException } from '@/common/exceptions';
import * as bcrypt from 'bcrypt';
import { Transactional } from 'typeorm-transactional';
import { parse, v4 } from 'uuid';

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

  // 통합 로그인 method 사전 작성
  async signIn(signInBody: SignInReqDto): Promise<SignInResDto> {
    const { loginId, password } = signInBody;

    // 존재하는 계정인지 확인
    const { handle, isBanned, salt, role } =
      await this.authRepository.findOneByLoginId(loginId);

    // 밴 여부 확인
    if (isBanned) throw new DiversException('BANNED_USER');

    // 비밀번호 암호화 검증
    const encrypted = await bcrypt.hash(password, salt);

    if (bcrypt.compare(password, encrypted)) {
      let keyId: number;

      if (role == Role.USER)
        keyId = (await this.userService.getUser(handle)).id;
      else keyId = 1; // 나중에 diveShopService와 adminService에서 하나씩 구현해오자.

      // accessToken
      const accessToken = await this.signToken({ handle, keyId, role });

      // refreshToken
      const refreshToken = await this.signToken({ handle });

      // save refreshToken in database
      await this.authRepository.updateAndCatchFail(
        { handle },
        { refreshToken },
      );

      return SignInResDto.signInSuccess(accessToken, refreshToken);
    } else throw new DiversException('WRONG_ID_PW'); // 틀린 비밀번호
  }

  // 유저 로그인
  async userSignIn(signInBody: SignInReqDto): Promise<SignInResDto> {
    const { loginId, password } = signInBody;

    // 존재하는 계정인지 확인
    const { handle, isBanned, salt, role } =
      await this.authRepository.findOneByLoginId(loginId);

    // 밴 여부 확인
    if (isBanned) throw new DiversException('BANNED_USER');

    // 유저인지 확인. 에러 코드 맞는지 나중에 생각
    if (role != Role.USER) throw new DiversException('NO_PERMISSION');

    // 비밀번호 암호화 검증
    const encrypted = await bcrypt.hash(password, salt);

    if (bcrypt.compare(password, encrypted)) {
      const { id: keyId } = await this.userService.getUser(handle);

      // accessToken
      const accessToken = await this.signToken({ handle, keyId, role });

      // refreshToken
      const refreshToken = await this.signToken({ handle });

      // save refreshToken in database
      await this.authRepository.updateAndCatchFail(
        { handle },
        { refreshToken },
      );

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

  @Transactional()
  async userSignUp(signUpBody: UserSignUpReqDto): Promise<MsgResDto> {
    const { loginId, password, createUserBody } = signUpBody;

    const newHandle = Buffer.from(parse(v4())).toString('base64').slice(0, -2);

    // 트랜잭션 필수 -> 지금은 nickname만 중복으로하면 auth만 만들어지고 user가 안만들어지는 현상이 있음

    // auth 만들기
    await this.createAuth({
      handle: newHandle,
      loginId,
      password,
      role: Role.USER,
    });

    // 만든 auth에 해당하는 user 만들어주기
    await this.userService.createUser(newHandle, createUserBody);

    return MsgResDto.success();
  }

  // shop signup의 경우 바로 회원가입이 아니라 인증 절차를 거쳐야함. 인증 신청 목록을 볼 수 있게끔 해야한다.
  /*
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
    */

  async signOut(handle: string): Promise<MsgResDto> {
    await this.authRepository.updateAndCatchFail(
      { handle },
      { refreshToken: null },
    );

    return MsgResDto.success();
  }

  async checkLoginIdDuplicate(loginId: string): Promise<MsgResDto> {
    if (await this.authRepository.exists({ where: { loginId } }))
      throw new DiversException('DUPLICATE_LOGIN_ID');

    return MsgResDto.success();
  }

  async accessRefresh(refreshToken: string): Promise<SignInResDto> {
    if (!refreshToken) throw new DiversException('NO_REFRESHTOKEN');

    const { handle } = await this.jwtService
      .verifyAsync(refreshToken)
      .catch(() => {
        throw new DiversException('INVALID_TOKEN');
      });

    const { role, refreshToken: savedRefresh } =
      await this.authRepository.findOneByHandle(handle);

    let keyId: number;

    if (role == Role.USER) keyId = (await this.userService.getUser(handle)).id;
    else if (role == Role.SHOP) keyId = 1;
    else keyId = 1;

    if (refreshToken != savedRefresh)
      throw new DiversException('INVALID_TOKEN');

    const newAccessToken = await this.signToken({
      handle,
      keyId,
      role,
    });

    const newRefreshToken = await this.signToken({ handle });

    await this.authRepository.updateAndCatchFail(
      { handle },
      { refreshToken: newRefreshToken },
    );

    return SignInResDto.signInSuccess(newAccessToken, newRefreshToken);
  }

  async createAuth(createAuthBody: CreateAuthReqDto) {
    const { handle, loginId, password, role } = createAuthBody;

    const salt = await bcrypt.genSalt();
    const encrypted = await bcrypt.hash(password, salt);

    await this.authRepository.insert({
      handle,
      loginId,
      salt,
      password: encrypted,
      role,
    });
  }

  async signToken(
    data: JwtAccessPayloadDto | JwtRefreshPayloadDto,
  ): Promise<string> {
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
