import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import BasicDate from '@/entities/BasicDate';
import { Auth, Country } from '@/entities/index';

@Entity('user')
class User extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Auth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authHandle', referencedColumnName: 'handle' })
  auth: Auth;

  @Column()
  authHandle: string;

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
   생년월일
  */
  @Column({ nullable: true })
  birth: string;

  /**
   성별
  */
  @Column({ nullable: true })
  gender: string;

  /**
   프로필 이미지 파일 이름
  */
  @Column({ nullable: true })
  profileImageName: string;

  /**
   다이빙 자격증 단계
  */
  @Column({ default: 1 })
  diveRank: number;

  /**
   이메일
  */
  @Column({ nullable: true })
  email: string;

  /**
   전화번호
  */
  @Column({ nullable: true })
  phone: string;

  // @Column()
  // preference
}

export default User;
