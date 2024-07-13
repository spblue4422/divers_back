import { CreateUserReqDto } from 'src/apis/user/dtos/createUserReq.dto';
import { SignInReqDto } from './signInReq.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignUpReqDto extends SignInReqDto {
  @ApiProperty({ description: '유저 생성에 필요한 정보' })
  createUserBody: CreateUserReqDto;
}
