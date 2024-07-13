import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Auth from './Auth';
import Country from './Country';
import { BasicDate } from 'src/entities/BasicDate';

@Entity('dive_shop')
class DiveShop extends BasicDate {
  /**
   dive_shop_id
  */
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Auth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authId' })
  auth: Auth;

  @Column()
  authId: number;

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
   위치
  */
  @Column()
  city: string;

  /**
   주소
  */
  @Column()
  detailAddress: string;

  /**
   추천 수
  */
  @Column()
  recommendation: number;

  /**
   평균 평점이 필요할까
  */
  @Column({ default: 0 })
  averageStar: number;

  @Column({ nullable: true, default: null })
  certifiedAt: Date;
}

export default DiveShop;
