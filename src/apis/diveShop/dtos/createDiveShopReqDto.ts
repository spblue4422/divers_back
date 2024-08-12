import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateDiveShopReqDto {
  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsString()
  representative: string;

  @ApiProperty({})
  phone: string;

  @ApiProperty({})
  @IsString()
  countryCode: string;

  @ApiProperty({})
  @IsString()
  city: string;

  @ApiProperty({})
  @IsString()
  detailAddress: string;

  @ApiProperty({})
  @IsString()
  description: string;
}
