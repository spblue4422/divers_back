import { IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ModifyDivePointReviewReqDto {
  @ApiProperty({ description: '다이빙 샵 id' })
  @IsOptional()
  @IsNumber()
  shopId: number;

  @ApiProperty({ description: '다이빙 샵 이름' })
  @IsOptional()
  @IsString()
  shopName: string;

  @ApiProperty({ description: '내용' })
  @IsString()
  text: string;

  @ApiProperty({ description: '별점' })
  @IsNumber()
  star: number;
}
