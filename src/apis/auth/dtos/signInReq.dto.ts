import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInReqDto {
  @ApiProperty({ description: '로그인 아이디' })
  @IsString()
  loginId: string;

  @ApiProperty({ description: '암호화 되지 않은 비밀번호' })
  @IsString()
  password: string;
}
