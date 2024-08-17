import { ApiProperty } from '@nestjs/swagger';

import { DiveShopCertApply } from '@/entities/index';

export class CertApplicationResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  shopId: number;

  @ApiProperty()
  shopName: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  judgedDate: Date;

  @ApiProperty()
  rejectReason: string;

  static makeRes(data: DiveShopCertApply) {
    const { approvedDate, rejectedDate } = data;
    const resDto = new CertApplicationResDto();

    resDto.id = data.id;
    resDto.shopId = data.shopId;
    resDto.shopName = data.diveShop.name;
    if (approvedDate) {
      resDto.state = '승인';
      resDto.judgedDate = approvedDate;
    } else if (rejectedDate) {
      resDto.state = '거부';
      resDto.judgedDate = rejectedDate;
      resDto.rejectReason = data.rejectReason;
    } else resDto.state = '심사중';

    return resDto;
  }
}
