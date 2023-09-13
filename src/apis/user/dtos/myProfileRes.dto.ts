import { ApiProperty } from '@nestjs/swagger';
import { UserProfileResDto } from './userProfileRes.dto';
import User from 'src/entities/User';

export class MyProfileResDto extends UserProfileResDto {
  @ApiProperty({ description: '이름' })
  firstname: string;

  @ApiProperty({ description: '성' })
  lastname: string;

  @ApiProperty({ description: '생년월일' })
  birth: string;

  @ApiProperty({ description: '성별' })
  gender: string;

  @ApiProperty({ description: '가입일자' })
  createdAt: Date;

  static async makeRes(data: User) {
    const resDto = new MyProfileResDto();
    resDto.nickname = data.nickname;
    resDto.countryCode = data.countryCode;
    resDto.profileImageUrl = data.profileImageUrl;
    resDto.diveRank = data.diveRank;
    resDto.firstname = data.firstname;
    resDto.lastname = data.lastname;
    resDto.birth = data.birth;
    resDto.gender = data.gender;
    resDto.createdAt = new Date(data.createdAt.toString());

    return resDto;
  }
}
