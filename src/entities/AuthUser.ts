import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_user')
class AuthUser {
  @PrimaryGeneratedColumn()
  id: number;
}

export default AuthUser;
