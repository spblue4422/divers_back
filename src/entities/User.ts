import { BasicDate } from 'src/entities/BasicDate';
import Country from './Country';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
class User extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   닉네임
  */
  @Column()
  nickname: string;

  /**
   이름
  */
  @Column()
  firstname: string;

  /**
   성
  */
  @Column()
  lastname: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryCode' })
  country: Country;

  /**
   국가 코드
  */
  @Column()
  countryCode: string;

  /**
   나이
  */
  @Column({ nullable: false })
  age: number;

  /**
   성별
  */
  @Column({ nullable: false })
  gender: 'Male' | 'Female';

  /**
   프로필 이미지 url
  */
  @Column()
  profileImageUrl: string;

  /**
   다이빙 자격증 랭크
  */
  @Column()
  diveRank: string;

  // @Column()
  // preference

  /**
   블락 여부
  */
  @Column({ default: false })
  isBlocked: boolean;
}

export default User;
