import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BasicDate, Country } from '@/entities/index';

// import Country from './Country';
// import { BasicDate } from '@/entities/index/BasicDate';

@Entity('dive_point')
class DivePoint extends BasicDate {
  /**
   dive_point_id
  */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   포인트 이름
  */
  @Column()
  name: string;

  /**
   포인트 설명
  */
  @Column()
  description: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryCode' })
  country: Country;

  /**
   국가 코드
  */
  @Column()
  countryCode: string;

  /**
   위치
  */
  @Column()
  location: string;

  /**
   추천 수
  */
  @Column({ default: 0 })
  recommendation: number;

  //평균 평점을 각 테이블에 굳이 저장해야할까?
  @Column({ default: 0, type: 'decimal', precision: 3, scale: 1 })
  averageStar: number;
}

export default DivePoint;
