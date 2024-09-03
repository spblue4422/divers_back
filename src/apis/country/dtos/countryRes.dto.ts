import { ApiProperty } from '@nestjs/swagger';

import { Country } from '@/entities';

export class CountryResDto {
  @ApiProperty({ description: '국가 코드' })
  countryCode: string;

  @ApiProperty({ description: '국가 이름(한글)' })
  kName: string;

  @ApiProperty({ description: '국가 이름(영어)' })
  eName: string;

  @ApiProperty({ description: '설명' })
  description: string;

  // 사진들?

  static makeRes(data: Country): CountryResDto {
    const resDto = new CountryResDto();

    resDto.countryCode = data.countryCode;
    resDto.kName = data.kName;
    resDto.eName = data.eName;
    resDto.description = data.description;

    return resDto;
  }
}
