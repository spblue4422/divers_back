import Country from 'src/common/entities/country';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryCode' })
  country: Country;

  @Column()
  countryCode: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  profileImageUrl: string;

  @Column()
  diveRank: string;

  // @Column()
  // preference

  @Column({ default: false })
  isBlocked: boolean;
}

export default User;
