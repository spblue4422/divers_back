import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ModifyDiveShopReqDto {
  @ApiProperty({})
  @IsString()
  name: string;

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
