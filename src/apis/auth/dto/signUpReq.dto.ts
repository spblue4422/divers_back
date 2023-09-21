import { ApiProperty } from '@nestjs/swagger';
import { SignInReqDto } from './signInReq.dto';
import { IsString } from 'class-validator';
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

  @ApiProperty({ description: '국가 코드' })
  countryCode?: string;

  @ApiProperty({ description: '성별' })
  gender?: string;

  @ApiProperty({ description: '로그인 타입' })
  joinType: JoinType;
}
