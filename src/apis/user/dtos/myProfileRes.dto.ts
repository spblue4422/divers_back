import { ApiProperty } from '@nestjs/swagger';

import { UserProfileResDto } from '@/apis/user/dtos/userProfileRes.dto';
import { DivingRank } from '@/common/enums';
import { User } from '@/entities/index';

export class MyProfileResDto extends UserProfileResDto {
  @ApiProperty({ description: '이름', default: '승은' })
  firstname: string;

  @ApiProperty({ description: '성', default: '유' })
  lastname: string;

  @ApiProperty({ description: '생년월일', default: '20001211' })
  birth: string;

  @ApiProperty({ description: '성별', default: '남' })
  gender: string;

  @ApiProperty({ description: '가입일자', default: '20240801' })
  createdAt: Date;

  static async makeRes(data: User) {
    const resDto = new MyProfileResDto();

    resDto.handle = data.authHandle;
    resDto.nickname = data.nickname;
    resDto.countryCode = data.countryCode;
    resDto.profileImageName = data.profileImageName;
    resDto.diveRank = DivingRank[data.diveRank] as unknown as DivingRank;
    resDto.firstname = data.firstname;
    resDto.lastname = data.lastname;
    resDto.birth = data.birth;
    resDto.gender = data.gender;
    resDto.createdAt = new Date(data.createdAt.toString());

    return resDto;
  }
}
