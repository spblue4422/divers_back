import { Timestamp } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { DiveLogInListResDto } from '@/apis/diveLog/dtos/diveLogInListRes.dto';
import {
  DegreeExpression,
  DivingEquipment,
  DivingType,
  Weather,
} from '@/common/enums';
import { DiveLogDetail } from '@/entities/index';

export class DiveLogResDto extends DiveLogInListResDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  shopId: number;

  @ApiProperty()
  shopName: string;

  @ApiProperty()
  pointId: number;

  @ApiProperty()
  location: string;

  @ApiProperty()
  buddy: string;

  @ApiProperty()
  blockReason?: string;

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

  static makeDetailRes(data: DiveLogDetail) {
    const resDto = new DiveLogResDto();
    const { diveLog } = data;

    resDto.id = data.logId;
    resDto.userId = diveLog.userId;
    resDto.nickname = diveLog.user.nickname;
    resDto.shopId = diveLog.shopId ?? 0;
    resDto.shopName = diveLog.shopName;
    resDto.pointId = diveLog.pointId ?? 0;
    resDto.pointName = diveLog.pointName;
    resDto.location = diveLog.location;
    resDto.buddy = diveLog.buddy;
    resDto.diveDate = diveLog.diveDate;
    resDto.isPublic = diveLog.isPublic;
    resDto.isBlocked = diveLog.isBlocked;
    resDto.blockReason = diveLog.blockReason ?? '';
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
    // equipment.split(',')의 결과물 => ['1', '2', '3', '4', '5']
    resDto.equipment = data.equipment
      .split(',')
      .map((e) => DivingEquipment[Number(e)] as unknown as DivingEquipment);
    // type.split(',')의 결과물 => ['1', '2', '3']
    resDto.type = data.type
      .split(',')
      .map((e) => DivingType[Number(e)] as unknown as DivingType);
    resDto.text = data.text;
    resDto.createdAt = new Date(diveLog.createdAt.toString());

    return resDto;
  }
}
