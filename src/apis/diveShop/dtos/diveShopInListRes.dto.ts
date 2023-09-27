import { ApiProperty } from '@nestjs/swagger';
import DiveShop from 'src/entities/DiveShop';

export class DiveShopInListResDto {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  name: string;

  @ApiProperty({})
  countryCode: string;

  @ApiProperty({})
  city: string;

  @ApiProperty({})
  averageStar: number;

  static makeRes(data: DiveShop) {
    const resDto = new DiveShopInListResDto();

    resDto.id = data.id;
    resDto.name = data.name;
    resDto.countryCode = data.countryCode;
    resDto.city = data.city;
    resDto.averageStar = data.averageStar;

    return resDto;
  }
}
