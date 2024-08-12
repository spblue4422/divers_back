import { ApiProperty } from '@nestjs/swagger';

import { DiveShopInListResDto } from '@/apis/diveShop/dtos/diveShopInListRes.dto';
import { DiveShop } from '@/entities/index';

export class DiveShopResDto extends DiveShopInListResDto {
  @ApiProperty()
  representative: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({})
  description: string;

  @ApiProperty({})
  detailAddress: string;

  @ApiProperty({})
  recommendation: number;

  static makeRes(data: DiveShop) {
    const resDto = new DiveShopResDto();

    resDto.id = data.id;
    resDto.name = data.name;
    resDto.countryCode = data.countryCode;
    resDto.city = data.city;
    resDto.description = data.description;
    resDto.representative = data.representative;
    resDto.phone = data.phone;
    resDto.detailAddress = data.detailAddress;
    resDto.averageStar = data.averageStar;
    resDto.recommendation = data.recommendation;

    return resDto;
  }
}
