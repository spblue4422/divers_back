import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BasicDate, Country, User } from '@/entities/index';

@Entity('tour')
class Tour extends BasicDate {
  // 로그를 묶어볼 수 있는 시스템이 있으면 좋지 않을까? - 앨범처럼
  // 기본으로 묶음을 제공할 수 있는 기능을 제시하고, 부가적인 정렬은 따로 정렬기능을 제공하자
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column()
  name: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryCode' })
  country: Country;

  @Column()
  countryCode: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: false })
  isPublic: boolean;
}

export default Tour;
