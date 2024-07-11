import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { throwErr } from 'src/common/utils/errorHandler';
import { SignInResDto } from './dtos/signInRes.dto';
import { ConfigService } from '@nestjs/config';
import { SignUpReqDto } from './dtos/signUpReq.dto';
import { UserService } from '../user/user.service';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { InsertResult } from 'typeorm';
import { SignInReqDto } from './dtos/signInReq.dto';
import { DiveShopService } from '../diveShop/diveShop.service';

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
  secret = this.configService.get<string>('SECRETKEY');
  access_expired = this.configService.get<string>('ACCESS_EXPIRED');
  refresh_expired = this.configService.get<string>('REFRESH_EXPIRED');

  async signIn(signInBody: SignInReqDto) {
    const { loginId, password } = signInBody;
    //존재하는 계정인지 확인
    const { id, isBanned, salt } =
      await this.authRepository.findOneByLoginIdOrFail(loginId);

    // 밴 당한 계정인지 확인
    if (isBanned) throwErr('BANNED_USER');

    //비밀번호 암호화 검증
    const encrypted = await bcrypt.hash(password, salt);

    // accesstoken과 refreshtoken 디비에 넣어줘야하나?
    if (bcrypt.compare(password, encrypted)) {
      const accessToken = await this.jwtService.signAsync(
        { id, loginId },
        { secret: this.secret, expiresIn: this.access_expired },
      );

      const refreshToken = await this.jwtService.signAsync(
        { id, loginId },
        { secret: this.secret, expiresIn: this.refresh_expired },
      );

      return SignInResDto.signInSuccess(accessToken, refreshToken);
    } else throwErr('WRONG_ID_PW'); // 틀린 비밀번호
  }

  async userSignUp(signUpBody: SignUpReqDto): Promise<MsgResDto> {
    const { loginId, password, createUserBody } = signUpBody;

    // auth 만들기
    const result: InsertResult = await this.createAuth(
      loginId,
      password,
      false,
    );

    // 만든 auth에 해당하는 user 만들어주기
    await this.userService.createUser(result.identifiers[0].id, createUserBody);

    return MsgResDto.success();
  }

  // shop signup의 경우 바로 회원가입이 아니라 인증 절차를 거쳐야함. 인증 신청 목록을 볼 수 있게끔 해야한다.
  async shopSignUp(signUpBody: SignUpReqDto): Promise<MsgResDto> {
    const { loginId, password } = signUpBody;

    const result: InsertResult = await this.createAuth(loginId, password, true);

    await this.diveShopService.createDiveshop(
      result.identifiers[0].id,
      signUpBody,
    );

    // 여기에 신청으로 넣어주는 로직이 있어야함.

    return MsgResDto.success();
  }

  async dupCheckLoginId(loginId: string): Promise<MsgResDto> {
    const uAuthExist = await this.authRepository.exist({ where: { loginId } });

    if (uAuthExist) throwErr('DUPLICATE_LOGIN_ID');

    return MsgResDto.success();
  }

  async accessRefresh(refreshToken: string) {
    // verify 형식이 어떻게 되는지 잘 모르겠네 이거 까봐야 알듯
    const decoded = await this.jwtService
      .verifyAsync(refreshToken, { secret: this.secret })
      .catch(() => throwErr('INVALID_TOKEN'));

    console.log(decoded);

    //decoded에서 loginId와 userId 뽑아내서 다시 쓰기

    const newRefreshToken = await this.jwtService.signAsync(
      {},
      { secret: this.secret, expiresIn: this.refresh_expired },
    );

    await this.authRepository.save({
      refreshToken: newRefreshToken,
    });
  }

  async createAuth(loginId: string, password: string, isShop: boolean) {
    const salt = await bcrypt.genSalt();
    const encrypted = await bcrypt.hash(password, salt);

    return this.authRepository.insert({
      // 되나? 잘 모름
      loginId,
      salt,
      password: encrypted,
      isShop,
    });
  }
}
