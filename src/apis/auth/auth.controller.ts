import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SignInReqDto } from './dtos/signInReq.dto';
import { UserSignUpReqDto } from './dtos/userSignUpReq.dto';
import { FindLoginIdReqDto } from './dtos/findLoginIdReq.dto';
import { ResetPasswordReqDto } from './dtos/resetPasswordReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { SignInResDto } from './dtos/signInRes.dto';
import { ShopSignUpReqDto } from './dtos/shopSignUpReq.dto';
import { AuthGuard } from './guards/auth.guard';
import { Current } from 'src/common/decorators/current';
import { JwtAccessPayloadDto } from 'src/common/dtos/jwtPayload.dto';

//@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  @ApiOkResponse({
    type: SignInResDto,
    description: '로그인',
  })
  async signIn(@Body() signInBody: SignInReqDto): Promise<SignInResDto> {
    return this.authService.signIn(signInBody);
  }

  @Post('/user/signIn')
  @ApiOkResponse({
    type: SignInResDto,
    description: '유저 로그인',
  })
  async userSignIn(@Body() signInBody: SignInReqDto): Promise<SignInResDto> {
    return this.authService.userSignIn(signInBody);
  }

  @UseGuards(AuthGuard)
  @Get('/signOut')
  @ApiOkResponse({
    type: MsgResDto,
    description: '로그아웃',
  })
  async signOut(@Current() cur: JwtAccessPayloadDto): Promise<MsgResDto> {
    const { authId } = cur;

    return this.authService.signOut(authId);
  }

  @Post('/user/signUp')
  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 회원가입',
  })
  async userSignUp(@Body() signUpBody: UserSignUpReqDto): Promise<MsgResDto> {
    return this.authService.userSignUp(signUpBody);
  }

  @Post('/shop/signUp')
  @ApiOkResponse({ type: MsgResDto, description: '샵 회원가입' })
  async shopSignUp(@Body() signUpBody: ShopSignUpReqDto): Promise<MsgResDto> {
    return this.authService.shopSignUp(signUpBody);
  }

  //어디까지 날려야할까?
  @UseGuards(AuthGuard)
  @Delete('/withdraw')
  @ApiOkResponse({
    type: MsgResDto,
    description: '회원 탈퇴',
  })
  async withdraw(@Body() withdrawalbody) {}

  @Get('/checkDuplicate/id')
  @ApiOkResponse({
    type: MsgResDto,
    description: '아이디 중복 체크',
  })
  async checkLoginIdDuplicate(@Query('id') loginId: string) {
    return this.authService.checkLoginIdDuplicate(loginId);
  }

  // 로직 - accesstoken 확인 - 에러 응답 - 재발급 api 호출 - 리프레쉬 토큰 확인 후 - 액세스, 리프레쉬 토큰 재발급
  @Get('/refresh')
  @ApiOkResponse({
    description: '액세스 토큰 재발급',
  })
  async refreshAccessToken(
    @Headers('refresh-token') refreshToken,
  ): Promise<SignInResDto> {
    return this.authService.accessRefresh(refreshToken);
  }

  @Post('/find/id/:loginId')
  @ApiOkResponse({
    description: '아이디 찾기',
  })
  async findLoginId(@Body() findLoginIdBody: FindLoginIdReqDto) {}

  @Patch('/reset/pw')
  @ApiOkResponse({
    type: MsgResDto,
    description: '비밀번호 초기화',
  })
  async resetPassword(@Body() resetPwBody: ResetPasswordReqDto) {}
}
