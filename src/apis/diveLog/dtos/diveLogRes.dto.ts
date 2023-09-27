import { ApiProperty } from '@nestjs/swagger';
import { DiveLog } from 'src/entities/DiveLog';
import { DiveLogInListResDto } from './diveLogInListRes.dto';

export class DiveLogResDto extends DiveLogInListResDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  shopId: number;

  @ApiProperty()
  shopName: string;

  @ApiProperty()
  pointId: number;

  @ApiProperty()
  location: string;

  @ApiProperty()
  buddy: string;

  @ApiProperty()
  blockReason?: string;

  static makeRes(data: DiveLog, isOwned: boolean) {
    const resDto = new DiveLogResDto();

    resDto.id = data.id;
    resDto.userId = data.userId;
    resDto.userNickname = data.user.nickname;
    resDto.shopId = data.shopId ?? 0;
    resDto.shopName = data.shopName;
    resDto.pointId = data.pointId ?? 0;
    resDto.pointName = data.pointName;
    resDto.location = data.location;
    resDto.buddy = data.buddy;
    resDto.diveDate = data.diveDate;
    resDto.isPublic = isOwned ? data.isPublic : null;
    resDto.isBlocked = isOwned ? data.isBlocked : null;
    resDto.blockReason = isOwned ? data.blockReason : null;

    return resDto;
  }
}
