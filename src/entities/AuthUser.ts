import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import { Auth } from './Auth';

@Entity('auth_user')
class AuthUser extends Auth {
  /**
   auth_user_id
  */
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   user_id
  */
  @Column()
  userId: number;
}

export default AuthUser;
