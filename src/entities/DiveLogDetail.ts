import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { DiveLog } from './DiveLog';
import {
  DegreeExpression,
  DivingEquipment,
  DivingType,
  Weather,
} from 'src/common/enums';
import { BasicDate } from './BasicDate';

@Entity('dive_log_detail')
export class DiveLogDetail extends BasicDate {
  @OneToOne(() => DiveLog)
  diveLog: DiveLog;

  /**
   dive_log_id
  */
  @PrimaryColumn()
  logId: bigint;

  /**
   날씨
  */
  @Column()
  weather: Weather;

  /**
   파도
  */
  @Column()
  wave: DegreeExpression;

  /**
   조류
  */
  @Column()
  current: DegreeExpression;

  /**
   입수 시각
  */
  @Column()
  diveInAt: Date;

  /**
   출수 시각
  */
  @Column()
  diveOutAt: Date;

  /**
   다이빙 시간
  */
  @Column()
  diveTime: number;

  /**
   입수 잔압
  */
  @Column()
  pressureIn: number;

  /**
   출수 잔압
  */
  @Column()
  pressureOut: number;

  /**
   평균 수심
  */
  @Column()
  avgDepth: number;

  /**
   최대 수심
  */
  @Column()
  maxDepth: number;

  /**
   평균 수온
  */
  @Column()
  waterTemperature: number;

  /**
   시야
  */
  @Column()
  visibility: DegreeExpression;

  /**
   웨이트
  */
  @Column()
  weight: number;

  /**
   착용 장비
  */
  @Column()
  equipment: DivingEquipment[];

  /**
   다이빙 타입
  */
  @Column()
  type: DivingType[];

  /**
   추가 메모
  */
  @Column()
  text: string;
}
