import { ApiProperty } from '@nestjs/swagger';
import { DivingRank } from 'src/common/enums';
import User from 'src/entities/User';

export class UserProfileResDto {
  // constructor(data: User) {
  //   this.nickname = data.nickname;
  //   this.countryCode = data.countryCode;
  //   this.profileImageUrl = data.profileImageUrl;
  //   this.diveRank = data.diveRank;
  // }

  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @ApiProperty({ description: '국가 코드' })
  countryCode: string;

  @ApiProperty({ description: '프로필 이미지 url' })
  profileImageUrl: string;

  @ApiProperty({ description: '다이빙 자격증 단계' })
  diveRank: DivingRank;

  static async makeRes(data: User) {
    const resDto = new UserProfileResDto();
    resDto.nickname = data.nickname;
    resDto.countryCode = data.countryCode;
    resDto.profileImageUrl = data.profileImageUrl;
    resDto.diveRank = data.diveRank;

    return resDto;
  }
}
