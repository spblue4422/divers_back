import { CreateUserProfileReqDto } from 'src/apis/user/dtos/createUserProfileReq.dto';
import { SignInReqDto } from './signInReq.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpReqDto extends SignInReqDto {
  @ApiProperty({ description: '유저 생성에 필요한 정보' })
  createUserBody: CreateUserProfileReqDto;
}
