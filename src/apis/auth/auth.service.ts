import { Injectable } from '@nestjs/common';
import { AuthShopRepository, AuthUserRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { throwErr } from 'src/common/utils/errorHandler';
import { SignInResDto } from './dto/signInRes.dto';
import { ConfigService } from '@nestjs/config';
import { SignUpReqDto } from './dto/signUpReq.dto';
import { UserService } from '../user/user.service';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly uAuthRepository: AuthUserRepository,
    private readonly sAuthRepository: AuthShopRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  //configService에서 주입
  secret = this.configService.get<string>('SECRETKEY');
  access_expired = this.configService.get<string>('ACCESS_EXPIRED');
  refresh_expired = this.configService.get<string>('REFRESH_EXPIRED');

  async signIn(loginId: string, password: string) {
    //존재하는 계정인지 확인
    const { userId, user, salt } =
      await this.uAuthRepository.findOneByLoginIdOrFail(loginId);

    // 밴 당한 계정인지 확인
    if (user.isBanned) throwErr('BANNED_USER');

    //비밀번호 암호화 검증
    const encrypted = await bcrypt.hash(password, salt);

    if (bcrypt.compare(password, encrypted)) {
      const accessToken = await this.jwtService.signAsync(
        { userId, loginId },
        { secret: this.secret, expiresIn: this.access_expired },
      );

      const refreshToken = await this.jwtService.signAsync(
        { userId, loginId },
        { secret: this.secret, expiresIn: this.refresh_expired },
      );

      return SignInResDto.signInSuccess(accessToken, refreshToken);
    } else throwErr('WRONG_ID_PW'); // 틀린 비밀번호
  }

  async signUp(signUpBody: SignUpReqDto): Promise<MsgResDto> {
    // 트랜잭션이 필요할 것 같네요 ㅇㅇ;
    const { loginId, password, createUserBody } = signUpBody;
    const { identifiers } = await this.userService.createUser(createUserBody);

    const salt = await bcrypt.genSalt();
    const encrypted = await bcrypt.hash(password, salt);

    await this.uAuthRepository.insert({
      // 되나? 잘 모름
      userId: Number(identifiers[0]),
      loginId,
      salt,
      password: encrypted,
    });

    return MsgResDto.success();
  }

  async dupCheckLoginId(loginId: string): Promise<MsgResDto> {
    return MsgResDto.success();
  }

  async accessRefresh(refreshToken: string) {
    // verify 형식이 어떻게 되는지 잘 모르겠네 이거 까봐야 알듯
    const decoded = await this.jwtService
      .verifyAsync(refreshToken, { secret: this.secret })
      .catch(() => throwErr('INVALID_TOKEN'));

    console.log(decoded);
  }
}
