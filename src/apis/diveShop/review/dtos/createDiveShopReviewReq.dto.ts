import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateDiveShopReviewReqDto {
  @ApiProperty({ description: 'dive_shop_id' })
  @IsNumber()
  shopId: number;

  @ApiProperty({ description: '리뷰 내용' })
  @IsString()
  text: string;

  @ApiProperty({ description: '별점' })
  @IsNumber()
  star: number;
}
