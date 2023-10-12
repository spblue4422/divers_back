import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SignInReqDto } from './dto/signInReq.dto';
import { SignUpReqDto } from './dto/signUpReq.dto';
import { FindLoginIdReqDto } from './dto/findLoginIdReq.dto';
import { ResetPasswordReqDto } from './dto/resetPasswordReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { SignInResDto } from './dto/signInRes.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  @ApiOkResponse({
    type: SignInResDto,
    description: '로그인',
  })
  async signIn(@Body() signInBody: SignInReqDto): Promise<SignInResDto> {
    const { loginId, password } = signInBody;

    return this.authService.signIn(loginId, password);
  }

  @Get('/signOut')
  @ApiOkResponse({
    type: MsgResDto,
    description: '로그아웃',
  })
  async signOut() {}

  @Post('/signUp')
  @ApiOkResponse({
    type: MsgResDto,
    description: '회원가입',
  })
  async signUp(@Body() signUpBody: SignUpReqDto): Promise<MsgResDto> {
    return this.authService.signUp(signUpBody);
  }

  //어디까지 날려야할까?
  @Delete('/withdraw')
  @ApiOkResponse({
    type: MsgResDto,
    description: '회원 탈퇴',
  })
  async withdraw(@Body() withdrawalbody) {}

  @Get('/dupCheck/id/:loginId')
  @ApiOkResponse({
    type: MsgResDto,
    description: '아이디 중복 체크',
  })
  async dupCheckLoginId(@Param() loginId: string) {
    return this.authService.dupCheckLoginId(loginId);
  }

  //이거 쓰려나?
  @Post('/refresh')
  @ApiOkResponse({
    description: '액세스 토큰 재발급',
  })
  async refreshAccessToken(@Body() refreshAccessBody) {}

  @Post('/find/id/:loginId')
  @ApiOkResponse({
    description: '아이디 찾기',
  })
  async findLoginId(@Body() findIdBody: FindLoginIdReqDto) {}

  @Patch('/reset/pw')
  @ApiOkResponse({
    type: MsgResDto,
    description: '비밀번호 초기화',
  })
  async resetPassword(@Body() resetPwBody: ResetPasswordReqDto) {}
}
