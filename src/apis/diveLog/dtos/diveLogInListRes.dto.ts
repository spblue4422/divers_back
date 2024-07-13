import { ApiProperty } from '@nestjs/swagger';
import { DiveLog } from 'src/entities';

export class DiveLogInListResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userNickname: string;

  @ApiProperty()
  pointName: string;

  @ApiProperty()
  diveDate: Date;

  @ApiProperty()
  isPublic?: boolean;

  @ApiProperty()
  isBlocked?: boolean;

  static makeRes(data: DiveLog, isOwned: boolean) {
    const resDto = new DiveLogInListResDto();

    resDto.id = data.id;
    resDto.userNickname = data.user.nickname;
    resDto.pointName = data.pointName;
    resDto.diveDate = data.diveDate;
    resDto.isPublic = isOwned ? data.isPublic : null;
    resDto.isBlocked = isOwned ? data.isBlocked : null;

    return resDto;
  }
}
