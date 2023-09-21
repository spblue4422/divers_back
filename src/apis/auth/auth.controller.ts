import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SignInReqDto } from './dto/signInReq.dto';
import { SignUpReqDto } from './dto/signUpReq.dto';
import { FindLoginIdReqDto } from './dto/findLoginIdReq.dto';

@Controller('auth')
export class AuthController {
  @Post('/signIn')
  async signIn(@Body() signInBody: SignInReqDto) {}

  @Get('/signOut')
  async signOut() {}

  @Post('/signUp')
  async signUp(@Body() signUpBody: SignUpReqDto) {}

  @Delete('/withdraw')
  async withdraw() {}

  @Get('/doubleCheck/id/:loginId')
  async doubleCheckLoginId(@Param() loginId: string) {}

  @Post('/find/id/:loginId')
  async findLoginId(@Body() findIdBody: FindLoginIdReqDto) {}

  @Patch('/reset/pw')
  async resetPassword(@Body() resetPwBody: ResetPasswordReqDto) {}
}
