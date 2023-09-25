import { BasicDate } from 'src/entities/BasicDate';
import Country from './Country';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DivingRank } from 'src/common/assets/enums';

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
   프로필 이미지 url
  */
  @Column()
  profileImageUrl: string;

  /**
   다이빙 자격증 단계
  */
  @Column()
  diveRank: DivingRank;

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
