import { ApiProperty } from '@nestjs/swagger';

import { SignInReqDto } from '@/apis/auth/dtos/signInReq.dto';
import { CreateUserReqDto } from '@/apis/user/dtos/createUserReq.dto';
import { IsObject } from 'class-validator';

export class UserSignUpReqDto extends SignInReqDto {
  @ApiProperty({ description: '유저 생성에 필요한 정보' })
  @IsObject()
  createUserBody: CreateUserReqDto;
}
