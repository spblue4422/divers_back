import { ApiProperty } from '@nestjs/swagger';

import { DiveShop } from '@/entities/index';

export class DiveShopInListResDto {
  @ApiProperty({ description: 'dive_shop_id' })
  id: number;

  @ApiProperty({ description: '다이빙 샵 이름' })
  shopName: string;

  @ApiProperty({ description: '국가 코드' })
  countryCode: string;

  @ApiProperty({ description: '도시' })
  city: string;

  @ApiProperty({ description: '평균 별점' })
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
