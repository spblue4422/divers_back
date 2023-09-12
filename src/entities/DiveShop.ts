import { BasicDate } from 'src/entities/BasicDate';
import Country from './Country';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dive_shop')
class DiveShop extends BasicDate {
  /**
   dive_shop_id
  */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   다이브 샵 이름
  */
  @Column()
  name: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryCode' })
  country: Country;

  /**
   국가 코드
  */
  @Column()
  countryCode: string;

  /**
   설명
  */
  @Column()
  description: string;

  /**
   주소
  */
  @Column()
  address: string;

  /**
   추천 수
  */
  @Column()
  recommendation: number;

  /**
   평균 평점이 피룡할까
  */
  @Column({ default: 0 })
  averageStar: number;
}

export default DiveShop;
