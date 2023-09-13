import { ApiProperty } from '@nestjs/swagger';
import { DivingRank } from 'src/common/enums';

export class modifyUserProfileReqDto {
  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @ApiProperty({ description: '생년월일' })
  birth: number;

  @ApiProperty({ description: '프로필 이미지' })
  profileImageUrl: string;

  @ApiProperty({ description: '다이빙 자격증 등급' })
  diveRank: DivingRank;
}
