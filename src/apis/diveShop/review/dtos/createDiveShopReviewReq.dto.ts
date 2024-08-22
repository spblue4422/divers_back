import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ModifyDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/modifyDiveShopReviewReq.dto';

export class CreateDiveShopReviewReqDto extends ModifyDiveShopReviewReqDto {
  @ApiProperty({ description: 'dive_shop_id' })
  @IsNumber()
  shopId: number;
}
