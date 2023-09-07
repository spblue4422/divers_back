import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth_dive_shop')
class AuthDiveShop {
  @PrimaryGeneratedColumn()
  id: number;
}

export default AuthDiveShop;
