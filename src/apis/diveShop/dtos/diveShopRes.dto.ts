import { ApiProperty } from '@nestjs/swagger';

import { DiveShopInListResDto } from '@/apis/diveShop/dtos/diveShopInListRes.dto';
import { DiveShop } from '@/entities/index';

export class DiveShopResDto extends DiveShopInListResDto {
  @ApiProperty({ description: '대표자 이름' })
  representative: string;

  @ApiProperty({ description: '연락처' })
  phone: string;

  @ApiProperty({ description: '설명' })
  description: string;

  @ApiProperty({ description: '상세 주소' })
  detailAddress: string;

  @ApiProperty({ description: '추천 수' })
  recommendation: number;

  static makeRes(data: DiveShop) {
    const resDto = new DiveShopResDto();

    resDto.id = data.id;
    resDto.shopName = data.name;
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
