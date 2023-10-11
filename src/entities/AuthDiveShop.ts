import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DiveShop from './DiveShop';
import { Auth } from './Auth';

@Entity('auth_dive_shop')
class AuthDiveShop extends Auth {
  /**
   auth_dive_shop_id
  */
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DiveShop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shopId' })
  diveShop: DiveShop;

  /**
   dive_shop_id
  */
  @Column()
  shopId: number;
}

export default AuthDiveShop;
