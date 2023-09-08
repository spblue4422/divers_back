import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import DiveShop from './DiveShop';

@Entity('dive_shop_review')
class DiveShopReview {
  @PrimaryGeneratedColumn()
  id: bigint;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => DiveShop)
  @JoinColumn({ name: 'shopId' })
  diveShop: DiveShop;

  @Column()
  shopId: number;

  @Column()
  text: string;

  @Column({})
  star: number;

  @Column({
    default: 0,
  })
  likes: number;

  @Column({
    default: 0,
  })
  dislikes: number;
}

export default DiveShopReview;
