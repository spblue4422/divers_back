import { ApiProperty } from '@nestjs/swagger';

import { DivePointInListResDto } from '@/apis/divePoint/dtos/divePointInListRes.dto';
import { DivePoint } from '@/entities/index';

export class DivePointResDto extends DivePointInListResDto {
  @ApiProperty({ description: '설명', default: '이 포인트는 어쩌구' })
  description: string;

  @ApiProperty({ description: '지역', default: '강릉' })
  location: string;

  @ApiProperty({ description: '추천 수', default: 100 })
  recommendation: number;

  static makeRes(data: DivePoint) {
    const resDto = new DivePointResDto();

    resDto.id = data.id;
    resDto.pointName = data.name;
    resDto.description = data.description;
    resDto.countryCode = data.countryCode;
    resDto.location = data.location;
    resDto.recommendation = data.recommendation;
    resDto.averageStar = data.averageStar;

    return resDto;
  }
}
