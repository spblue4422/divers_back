import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Tour } from 'src/entities';

export class TourInListResDto {
  @ApiProperty({})
  @IsNumber()
  id: number;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  countryCode: string;

  @ApiProperty({})
  startDate: Date;

  @ApiProperty({})
  endDate: Date;

  static makeRes(data: Tour) {
    const resData = new TourInListResDto();

    resData.id = data.id;
    resData.name = data.name;
    resData.countryCode = data.countryCode;
    resData.startDate = data.startDate;
    resData.endDate = data.endDate;

    return resData;
  }
}
