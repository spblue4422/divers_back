import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { DivingRank } from '@/common/enums';
import { User } from '@/entities/index';

export class UserProfileResDto {
  @ApiProperty({ description: 'auth_handle', default: '123456789' })
  handle: string;

  @ApiProperty({ description: '닉네임', default: '닉네임' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: '국가 코드', default: 'KOR' })
  countryCode: string;

  @ApiProperty({ description: '프로필 이미지 url', default: 'url' })
  profileImageUrl: string;

  @ApiProperty({ description: '다이빙 자격증 단계' })
  diveRank: DivingRank;

  static async makeRes(data: User) {
    const resDto = new UserProfileResDto();

    resDto.handle = data.authHandle;
    resDto.nickname = data.nickname;
    resDto.countryCode = data.countryCode;
    resDto.profileImageUrl = data.profileImageUrl;
    resDto.diveRank = DivingRank[data.diveRank] as unknown as DivingRank;

    return resDto;
  }
}
