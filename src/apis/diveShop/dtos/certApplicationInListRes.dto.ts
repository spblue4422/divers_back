import { ApiProperty } from '@nestjs/swagger';
import { DiveShopCertApply } from 'src/entities';

export class CertApplicationInListResDto {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  shopId: number;

  @ApiProperty({})
  name: string;

  @ApiProperty({})
  state: string;

  static makeRes(data: DiveShopCertApply) {
    const { approvedDate, rejectedDate } = data;
    const resDto = new CertApplicationInListResDto();

    resDto.id = data.id;
    resDto.shopId = data.shopId;
    resDto.name = data.diveShop.name;
    if (approvedDate) resDto.state = '승인';
    else if (rejectedDate) resDto.state = '거부';
    else resDto.state = '심사중';

    return resDto;
  }
}
