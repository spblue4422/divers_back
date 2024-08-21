import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SignInReqDto {
  @ApiProperty({ description: '로그인 아이디', default: 'id' })
  @IsString()
  loginId: string;

  @ApiProperty({ description: '암호화 되지 않은 비밀번호', default: 'pw' })
  @IsString()
  password: string;
}
