import { ApiProperty } from '@nestjs/swagger';
import {
  DegreeExpression,
  DivingEquipment,
  Weather,
  DivingType,
} from 'src/common/enums';

export class DiveLogDetailResDto {
  @ApiProperty()
  logId: number;

  @ApiProperty()
  weather: Weather;

  @ApiProperty()
  wave: DegreeExpression;

  @ApiProperty()
  current: DegreeExpression;

  @ApiProperty()
  diveInAt: Date;

  @ApiProperty()
  diveOutAt: Date;

  @ApiProperty()
  diveTime: number;

  @ApiProperty()
  pressureIn: number;

  @ApiProperty()
  pressureOut: number;

  @ApiProperty()
  avgDepth: number;

  @ApiProperty()
  maxDepth: number;

  @ApiProperty()
  waterTemperature: number;

  @ApiProperty()
  visibility: DegreeExpression;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  equipment: DivingEquipment[];

  @ApiProperty()
  type: DivingType[];

  @ApiProperty()
  text: string;
}
