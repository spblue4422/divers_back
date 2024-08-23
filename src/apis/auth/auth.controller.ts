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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from '@/apis/auth/auth.service';
import { FindLoginIdReqDto } from '@/apis/auth/dtos/findLoginIdReq.dto';
import { ResetPasswordReqDto } from '@/apis/auth/dtos/resetPasswordReq.dto';
import { ShopSignUpReqDto } from '@/apis/auth/dtos/shopSignUpReq.dto';
import { SignInReqDto } from '@/apis/auth/dtos/signInReq.dto';
import { SignInResDto } from '@/apis/auth/dtos/signInRes.dto';
import { UserSignUpReqDto } from '@/apis/auth/dtos/userSignUpReq.dto';
import { AuthRoleGuard } from '@/apis/auth/guards/authAndRole.guard';
import { Current } from '@/common/decorators/current';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user/signIn')
  @ApiOperation({ description: '유저 로그인 API' })
  @ApiOkResponse({
    type: SignInResDto,
    description: '유저 로그인 API',
  })
  async userSignIn(@Body() signInBody: SignInReqDto): Promise<SignInResDto> {
    return this.authService.userSignIn(signInBody);
  }

  @Get('/signOut')
  @UseGuards(AuthRoleGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({ description: '로그아웃 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '로그아웃 성공',
  })
  async signOut(@Current() cur: JwtAccessPayloadDto): Promise<MsgResDto> {
    const { handle } = cur;

    return this.authService.signOut(handle);
  }

  @Post('/user/signUp')
  @ApiOperation({ description: '유저 회원가입 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 회원가입 성공',
  })
  async userSignUp(@Body() signUpBody: UserSignUpReqDto): Promise<MsgResDto> {
    return this.authService.userSignUp(signUpBody);
  }

  /*
  @Post('/shop/signUp')
  @ApiOkResponse({ type: MsgResDto, description: '샵 회원가입' })
  async shopSignUp(@Body() signUpBody: ShopSignUpReqDto): Promise<MsgResDto> {
    return this.authService.shopSignUp(signUpBody);
  }
    */

  @Delete('/withdraw')
  @UseGuards(AuthRoleGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({ description: '회원 탈퇴 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '회원 탈퇴 성공',
  })
  async withdraw(@Body() withdrawalbody, @Current() cur: JwtAccessPayloadDto) {
    const { handle } = cur;

    // 일단 user로 어떻게 되나 확인해보고 자세한 로직을 결정하자
    return this.authService.userWithdraw(handle);
  }

  @Get('/checkDuplicate/id')
  @ApiOperation({ description: '아이디 중복 체크 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '검사 통과',
  })
  async checkLoginIdDuplicate(@Query('id') loginId: string) {
    return this.authService.checkLoginIdDuplicate(loginId);
  }

  // 로직 - accesstoken 확인 - 에러 응답 - 재발급 api 호출 - 리프레쉬 토큰 확인 후 - 액세스, 리프레쉬 토큰 재발급
  @Get('/refresh')
  @ApiOperation({ description: '액세스 토큰 재발급 API' })
  @ApiOkResponse({
    type: SignInResDto,
    description: '재발급 성공',
  })
  async refreshAccessToken(
    @Headers('refresh-token') refreshToken: string,
  ): Promise<SignInResDto> {
    return this.authService.accessRefresh(refreshToken);
  }

  @Post('/find/id/:loginId')
  @ApiOperation({ description: '아이디 찾기 API' })
  @ApiOkResponse({
    description: '아이디 찾기',
  })
  async findLoginId(@Body() findLoginIdBody: FindLoginIdReqDto) {}

  @Patch('/reset/pw')
  @ApiOperation({ description: '비밀번호 초기화 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '비밀번호 초기화',
  })
  async resetPassword(@Body() resetPwBody: ResetPasswordReqDto) {}
}
