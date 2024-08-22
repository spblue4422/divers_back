import { ApiProperty } from '@nestjs/swagger';

import { DivePoint } from '@/entities/index';

export class DivePointInListResDto {
  @ApiProperty({ description: 'dive_point_id', default: 1 })
  id: number;

  @ApiProperty({ description: '다이빙 포인트 이름', default: '엄바위' })
  pointName: string;

  @ApiProperty({ description: '국가 코드', default: 'KOR' })
  countryCode: string;

  @ApiProperty({ description: '별점', default: 5.0 })
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
