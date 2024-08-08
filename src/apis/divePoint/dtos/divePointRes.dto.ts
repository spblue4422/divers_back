import { DivePoint } from 'src/entities';
import { DivePointInListResDto } from './divePointInListRes.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DivePointResDto extends DivePointInListResDto {
  @ApiProperty({ description: '설명' })
  description: string;

  @ApiProperty({ description: '위치' })
  location: string;

  @ApiProperty({ description: '추천수' })
  recommendation: number;

  static makeRes(data: DivePoint) {
    const resDto = new DivePointResDto();

    resDto.id = data.id;
    resDto.name = data.name;
    resDto.description = data.description;
    resDto.countryCode = data.countryCode;
    resDto.location = data.location;
    resDto.recommendation = data.recommendation;
    resDto.averageStar = data.averageStar;

    return resDto;
  }
}
