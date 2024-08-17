import { ApiProperty } from '@nestjs/swagger';

import { DivePoint } from '@/entities/index';

export class DivePointInListResDto {
  @ApiProperty({ description: 'dive_point_id' })
  id: number;

  @ApiProperty({ description: '다이빙 포인트 이름' })
  pointName: string;

  @ApiProperty({ description: '국가 코드' })
  countryCode: string;

  @ApiProperty({ description: '별점' })
  averageStar: number;

  static makeRes(data: DivePoint) {
    const resDto = new DivePointInListResDto();

    resDto.id = data.id;
    resDto.pointName = data.name;
    resDto.countryCode = data.countryCode;
    resDto.averageStar = data.averageStar;

    return resDto;
  }
}
