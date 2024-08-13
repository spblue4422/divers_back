import { ApiProperty } from '@nestjs/swagger';

import { DiveShop } from '@/entities/index';

export class DiveShopInListResDto {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  shopName: string;

  @ApiProperty({})
  countryCode: string;

  @ApiProperty({})
  city: string;

  @ApiProperty({})
  averageStar: number;

  static makeRes(data: DiveShop) {
    const resDto = new DiveShopInListResDto();

    resDto.id = data.id;
    resDto.shopName = data.name;
    resDto.countryCode = data.countryCode;
    resDto.city = data.city;
    resDto.averageStar = data.averageStar;

    return resDto;
  }
}
