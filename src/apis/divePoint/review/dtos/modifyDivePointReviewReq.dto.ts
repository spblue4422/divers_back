import { IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ModifyDivePointReviewReqDto {
  @ApiProperty({ description: '다이빙 샵 id', default: 1 })
  @IsOptional()
  @IsNumber()
  shopId: number;

  @ApiProperty({ description: '다이빙 샵 이름', default: null })
  @IsOptional()
  @IsString()
  shopName: string;

  @ApiProperty({ description: '리뷰 내용', default: '리뷰 내용' })
  @IsString()
  text: string;

  @ApiProperty({ description: '별점', default: 5.0 })
  @IsNumber()
  star: number;
}
