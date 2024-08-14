import { ApiProperty } from '@nestjs/swagger';

import { DiveLog } from '@/entities/index';

export class DiveLogInListResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  pointName: string;

  @ApiProperty()
  diveDate: Date;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  isBlocked: boolean;

  static makeRes(data: DiveLog) {
    const resDto = new DiveLogInListResDto();

    resDto.id = data.id;
    resDto.nickname = data.user.nickname;
    resDto.pointName = data.pointName;
    resDto.diveDate = data.diveDate;
    resDto.isPublic = data.isPublic;
    resDto.isBlocked = data.isBlocked;

    return resDto;
  }
}
