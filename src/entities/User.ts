import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  nickname: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @JoinColumn()
  countryCode: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  profileImageUrl: string;

  @Column()
  rank: string;

  // @Column()
  // preference
}

export default User;
