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

@Controller('auth')
export class AuthController {
  @Post('/signIn')
  async signIn(@Body() signInBody: SignInReqDto) {}

  @Get('/signOut')
  async signOut() {}

  @Post('/signUp')
  async signUp(@Body() signUpBody: SignUpReqDto) {}

  //어디까지 날려야할까?
  @Delete('/withdraw')
  async withdraw() {}

  @Get('/dupCheck/id/:loginId')
  async dupCheckLoginId(@Param() loginId: string) {}

  @Post('/find/id/:loginId')
  async findLoginId(@Body() findIdBody: FindLoginIdReqDto) {}

  @Patch('/reset/pw')
  async resetPassword(@Body() resetPwBody: ResetPasswordReqDto) {}
}
