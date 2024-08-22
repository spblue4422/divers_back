import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ModifyDivePointReviewReqDto } from '@/apis/divePoint/review/dtos/modifyDivePointReviewReq.dto';

export class CreateDivePointReviewReqDto extends ModifyDivePointReviewReqDto {
  @ApiProperty({ description: 'dive_point_id' })
  @IsNumber()
  pointId: number;

  // @ApiProperty({ description: 'dive_shop_id' })
  // @IsNumber()
  // shopId: number;
}
