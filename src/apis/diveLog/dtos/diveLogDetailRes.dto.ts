import { ApiProperty } from '@nestjs/swagger';
import {
  DegreeExpression,
  DivingEquipment,
  Weather,
  DivingType,
} from 'src/common/enums';
import { DiveLogDetail } from 'src/entities';

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

  @ApiProperty({ description: '작성 일자' })
  createdAt: Date;

  static makeRes(data: DiveLogDetail) {
    const resDto = new DiveLogDetailResDto();

    resDto.weather = Weather[data.weather] as unknown as Weather;
    resDto.wave = DegreeExpression[data.wave] as unknown as DegreeExpression;
    resDto.current = DegreeExpression[
      data.current
    ] as unknown as DegreeExpression;
    resDto.diveInAt = data.diveInAt;
    resDto.diveOutAt = data.diveOutAt;
    resDto.diveTime = data.diveTime;
    resDto.pressureIn = data.pressureIn;
    resDto.pressureOut = data.pressureOut;
    resDto.avgDepth = data.avgDepth;
    resDto.maxDepth = data.maxDepth;
    resDto.waterTemperature = data.waterTemperature;
    resDto.visibility = DegreeExpression[
      data.visibility
    ] as unknown as DegreeExpression;
    resDto.weight = data.weight;
    // resDto.equipment = data.equipment.map;

    resDto.text = data.text;
    resDto.createdAt = new Date(data.createdAt.toString());

    return resDto;
  }
}
