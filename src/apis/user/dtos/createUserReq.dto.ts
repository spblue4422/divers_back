import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserReqDto {
  @ApiProperty({ description: '닉네임' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: '이름' })
  @IsString()
  firstname: string;

  @ApiProperty({ description: '성' })
  @IsString()
  lastname: string;

  @ApiProperty({ description: '국적' })
  @IsString()
  countryCode: string;

  @ApiProperty({ description: '생년월일' })
  @IsOptional()
  birth: string;

  @ApiProperty({ description: '성별' })
  @IsOptional()
  gender: string;

  // 전화번호와 이메일은 나중에 따로 인증하는 로직으로

  //@ApiProperty({ description: '로그인 타입' })
  //joinType: JoinType;
}
