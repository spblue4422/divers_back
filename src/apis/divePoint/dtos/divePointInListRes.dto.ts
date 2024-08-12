import { ApiProperty } from '@nestjs/swagger';

import { DivePoint } from '@/entities/index';

export class DivePointInListResDto {
  @ApiProperty({ description: '포인트 id' })
  id: number;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '국가 코드' })
  countryCode: string;

  @ApiProperty({ description: '별점' })
  averageStar: number;

  static makeRes(data: DivePoint) {
    const resDto = new DivePointInListResDto();

    resDto.id = data.id;
    resDto.name = data.name;
    resDto.countryCode = data.countryCode;
    resDto.averageStar = data.averageStar;

    return resDto;
  }
}
