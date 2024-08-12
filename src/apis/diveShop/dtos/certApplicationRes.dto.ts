import { ApiProperty } from '@nestjs/swagger';

import { DiveShopCertApply } from '@/entities/index';

export class CertApplicationResDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  shopId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  judgedDate: Date;

  @ApiProperty()
  rejectReason: string;

  static makeRes(data: DiveShopCertApply) {
    const { approvedDate, rejectedDate } = data;
    const resDto = new CertApplicationResDto();

    // 따로 값을 안 넣어주면 null로 알아서 들어가겠지?
    resDto.id = data.id;
    resDto.shopId = data.shopId;
    resDto.name = data.diveShop.name;
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
