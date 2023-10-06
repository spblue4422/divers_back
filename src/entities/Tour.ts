import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicDate } from './BasicDate';
import Country from './Country';
import User from './User';

@Entity('tour')
export class Tour extends BasicDate {
  //로그를 묶어볼 수 있는 시스템이 있으면 좋지 않을까? - 앨범처럼
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
}
