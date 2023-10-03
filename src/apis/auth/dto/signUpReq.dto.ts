import { ApiProperty } from '@nestjs/swagger';
import { SignInReqDto } from './signInReq.dto';
import { IsOptional, IsString } from 'class-validator';
import { JoinType } from 'src/common/enums';

export class SignUpReqDto extends SignInReqDto {
  @ApiProperty({ description: '이름' })
  @IsString()
  firstname: string;

  @ApiProperty({ description: '성' })
  @IsString()
  lastname: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: '생년월일' })
  birth: string;

  @ApiProperty({ description: '성별' })
  gender: string;

  @ApiProperty({ description: '국적' })
  countryCode: string;

  @ApiProperty({ description: '이메일' })
  email?: string;

  @ApiProperty({ description: '전화번호' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: '로그인 타입' })
  joinType: JoinType;
}
