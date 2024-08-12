import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Auth, BasicDate, Country } from '@/entities/index';

// import Country from '@/entities/index/Country';
// import BasicDate from '@/entities/index/BasicDate';

@Entity('dive_shop')
class DiveShop extends BasicDate {
  /**
   dive_shop_id
  */
  @PrimaryGeneratedColumn()
  id: number;

  /*
  @OneToOne(() => Auth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authId' })
  auth: Auth;

  @Column()
  authId: number;
  */

  /**
   다이브 샵 이름
  */
  @Column()
  name: string;

  /**
   대표자 이름
  */
  @Column()
  representative: string;

  /**
   대표자 연락처
  */
  @Column()
  phone: string;

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
   연락처는 description에 적어도 될듯
   나중에 서비스를 더 확장한다면 카카오톡 id나 다른 연락처 column을 따로 만들기
  */

  /**
   추천 수
  */
  @Column({ default: 0 })
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
