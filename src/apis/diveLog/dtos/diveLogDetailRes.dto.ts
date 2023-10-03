import { ApiProperty } from '@nestjs/swagger';
import {
  DegreeExpression,
  DivingEquipment,
  Weather,
  DivingType,
} from 'src/common/enums';

export class DiveLogDetailResDto {
  @ApiProperty({ description: '로그 id' })
  logId: number;

  @ApiProperty({ description: '날씨' })
  weather: Weather;

  @ApiProperty({ description: '파도' })
  wave: DegreeExpression;

  @ApiProperty({ description: '조류' })
  current: DegreeExpression;

  @ApiProperty({ description: '입수 시각' })
  diveInAt: Date;

  @ApiProperty({ description: '출수 시각' })
  diveOutAt: Date;

  @ApiProperty({ description: '다이빙 시간' })
  diveTime: number;

  @ApiProperty({ description: '입수 잔압' })
  pressureIn: number;

  @ApiProperty({ description: '출수 잔압' })
  pressureOut: number;

  @ApiProperty({ description: '평균 수심' })
  avgDepth: number;

  @ApiProperty({ description: '최대 수심' })
  maxDepth: number;

  @ApiProperty({ description: '평균 수온' })
  waterTemperature: number;

  @ApiProperty({ description: '시야' })
  visibility: DegreeExpression;

  @ApiProperty({ description: '웨이트' })
  weight: number;

  @ApiProperty({ description: '착용 장비' })
  equipment: DivingEquipment[];

  @ApiProperty({ description: '다이빙 타입' })
  type: DivingType[];

  @ApiProperty({ description: '추가 메모' })
  text: string;
}
