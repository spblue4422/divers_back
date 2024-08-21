import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserReqDto {
  @ApiProperty({ description: '닉네임', default: '닉네임' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: '이름', default: '승은' })
  @IsString()
  firstname: string;

  @ApiProperty({ description: '성', default: '유' })
  @IsString()
  lastname: string;

  @ApiProperty({ description: '국적', default: 'KOR' })
  @IsString()
  countryCode: string;

  @ApiProperty({ description: '생년월일', default: '20001211' })
  @IsOptional()
  birth: string;

  @ApiProperty({ description: '성별', default: '남' })
  @IsOptional()
  gender: string;

  // 전화번호와 이메일은 나중에 따로 인증하는 로직으로

  //@ApiProperty({ description: '로그인 타입' })
  //joinType: JoinType;
}
