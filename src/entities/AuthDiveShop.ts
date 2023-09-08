import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DiveShop from './DiveShop';

@Entity('auth_dive_shop')
class AuthDiveShop {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DiveShop)
  @JoinColumn({ name: 'shopId' })
  diveShop: DiveShop;

  @Column()
  shopId: number;
}

export default AuthDiveShop;
