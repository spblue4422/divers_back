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
import {
  DegreeExpression,
  DivingEquipment,
  DivingType,
  Weather,
} from '@/common/enums';

export class CreateDiveLogReqDto {
  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  tourId?: number;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  shopId?: number;

  @ApiProperty({})
  @IsString()
  shopName: string;

  @ApiProperty({})
  @IsOptional()
  @IsNumber()
  pointId?: number;

  @ApiProperty({})
  @IsString()
  pointName: string;

  @ApiProperty({})
  @IsString()
  location: string;

  @ApiProperty({})
  @IsString()
  buddy: string;

  @ApiProperty({})
  @IsDate()
  diveDate: Date;

  @ApiProperty({})
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({})
  @IsWeather()
  weather: string;

  @ApiProperty({})
  @IsDegreeExpression()
  wave: string;

  @ApiProperty({})
  @IsDegreeExpression()
  current: string;

  @ApiProperty({})
  @IsDate()
  diveInAt: Date;

  @ApiProperty({})
  @IsDate()
  diveOutAt: Date;

  @ApiProperty({})
  @IsNumber()
  diveTime: number;

  @ApiProperty({})
  @IsNumber()
  pressureIn: number;

  @ApiProperty({})
  @IsNumber()
  pressureOut: number;

  @ApiProperty({})
  @IsNumber()
  avgDepth: number;

  @ApiProperty({})
  @IsNumber()
  maxDepth: number;

  @ApiProperty({})
  @IsNumber()
  waterTemperature: number;

  @ApiProperty({})
  @IsDegreeExpression()
  visibility: string;

  @ApiProperty({})
  @IsNumber()
  weight: number;

  @ApiProperty({})
  @IsEquipmentArray()
  equipment: string[];

  @ApiProperty({})
  @IsDivingTypeArray()
  type: string[];

  @ApiProperty({})
  @IsString()
  text: string;
}
