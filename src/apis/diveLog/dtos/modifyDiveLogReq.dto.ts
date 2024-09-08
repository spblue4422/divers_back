import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ModifyDiveLogReqDto {
  @ApiProperty({ description: 'tour_id' })
  @IsOptional()
  @IsNumber()
  tourId?: number;

  @ApiProperty({ description: 'dive_shop_id' })
  @IsOptional()
  @IsNumber()
  shopId?: number;

  @ApiProperty({ description: '다이빙 샵 이름' })
  @IsOptional()
  @IsString()
  shopName: string;

  @ApiProperty({ description: 'dive_point_id' })
  @IsOptional()
  @IsNumber()
  pointId?: number;

  @ApiProperty({ description: '다이빙 포인트 이름' })
  @IsString()
  pointName: string;

  @ApiProperty({ description: '지역' })
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty({ description: '버디' })
  @IsOptional()
  @IsString()
  buddy: string;

  @ApiProperty({ description: '다이빙 일자' })
  @IsDate()
  diveDate: Date;

  @ApiProperty({ description: '공개 여부' })
  @IsBoolean()
  isPublic: boolean;
}
