import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  IsDegreeExpression,
  IsDivingTypeArray,
  IsEquipmentArray,
  IsWeather,
} from '@/common/decorators/validator';

export class CreateDiveLogReqDto {
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

  @ApiProperty({ description: '날씨' })
  @IsWeather()
  weather: string;

  @ApiProperty({ description: '파도' })
  @IsDegreeExpression()
  wave: string;

  @ApiProperty({ description: '조류' })
  @IsDegreeExpression()
  current: string;

  @ApiProperty({ description: '입수 시각' })
  @IsDate()
  diveInAt: Date;

  @ApiProperty({ description: '출수 시각' })
  @IsDate()
  diveOutAt: Date;

  @ApiProperty({ description: '잠수 시간' })
  @IsNumber()
  diveTime: number;

  @ApiProperty({ description: '입수 잔압' })
  @IsNumber()
  pressureIn: number;

  @ApiProperty({ description: '출수 잔압' })
  @IsNumber()
  pressureOut: number;

  @ApiProperty({ description: '평균 수심' })
  @IsNumber()
  avgDepth: number;

  @ApiProperty({ description: '최대 수심' })
  @IsNumber()
  maxDepth: number;

  @ApiProperty({ description: '수온' })
  @IsNumber()
  waterTemperature: number;

  @ApiProperty({ description: '시야' })
  @IsDegreeExpression()
  visibility: string;

  @ApiProperty({ description: '웨이트' })
  @IsNumber()
  weight: number;

  @ApiProperty({ description: '장비' })
  @IsEquipmentArray()
  equipment: string[];

  @ApiProperty({ description: '다이빙 유형' })
  @IsDivingTypeArray()
  type: string[];

  @ApiProperty({ description: '추가 메모' })
  @IsString()
  text: string;
}
