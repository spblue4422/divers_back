import { ApiProperty } from '@nestjs/swagger';
import { DiveShopInListResDto } from './diveShopInListRes.dto';
import DiveShop from 'src/entities/DiveShop';

export class DiveShopResDto extends DiveShopInListResDto {
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
    resDto.detailAddress = data.detailAddress;
    resDto.averageStar = data.averageStar;
    resDto.recommendation = data.recommendation;

    return resDto;
  }
}
