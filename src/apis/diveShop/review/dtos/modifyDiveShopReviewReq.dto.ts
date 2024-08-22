import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ModifyDiveShopReviewReqDto {
  @ApiProperty({ description: '리뷰 내용', default: '여긴 어떤 곳일까' })
  @IsString()
  text: string;

  @ApiProperty({ description: '별점', default: 4.5 })
  @IsNumber()
  star: number;
}
