import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { DiveLog } from '@/entities/index';

@Entity('dive_log_detail')
class DiveLogDetail {
  @OneToOne(() => DiveLog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'logId' })
  diveLog: DiveLog;

  /**
   dive_log_id
  */
  @PrimaryColumn()
  logId: number;

  /**
   날씨
  */
  @Column()
  weather: number;

  /**
   파도
  */
  @Column()
  wave: number;

  /**
   조류
  */
  @Column()
  current: number;

  /**
   입수 시각
  */
  @Column({ type: 'time' })
  diveInAt: Date;

  /**
   출수 시각
  */
  @Column({ type: 'time' })
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
  @Column({ type: 'decimal', precision: 4, scale: 1 })
  avgDepth: number;

  /**
   최대 수심
  */
  @Column({ type: 'decimal', precision: 4, scale: 1 })
  maxDepth: number;

  /**
   평균 수온
  */
  @Column({ type: 'decimal', precision: 4, scale: 1 })
  waterTemperature: number;

  /**
   시야
  */
  @Column()
  visibility: number;

  /**
   웨이트
  */
  @Column({ type: 'decimal', precision: 4, scale: 1 })
  weight: number;

  /**
   착용 장비
  */
  @Column()
  equipment: string;

  /**
   다이빙 타입
  */
  @Column()
  type: string;

  /**
   추가 메모
  */
  @Column()
  text: string;
}

export default DiveLogDetail;
