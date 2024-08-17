import { ApiProperty } from '@nestjs/swagger';

import { DiveLog } from '@/entities/index';

export class DiveLogInListResDto {
  @ApiProperty({ description: 'dive_log_id' })
  id: number;

  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @ApiProperty({ description: '다이빙 포인트 이름' })
  pointName: string;

  @ApiProperty({ description: '다이빙 일자' })
  diveDate: Date;

  @ApiProperty({ description: '공개 여부' })
  isPublic: boolean;

  @ApiProperty({ description: '블락 여부' })
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
