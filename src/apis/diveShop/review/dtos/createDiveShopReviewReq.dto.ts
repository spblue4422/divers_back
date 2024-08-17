import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateDiveShopReviewReqDto {
  @ApiProperty({})
  @IsNumber()
  shopId: number;

  @ApiProperty({})
  @IsString()
  text: string;

  @ApiProperty({})
  @IsNumber()
  star: number;
}
