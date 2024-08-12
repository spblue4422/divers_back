import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BasicDate, DiveShop, User } from '@/entities/index';

@Entity('review_dive_shop')
class DiveShopReview extends BasicDate {
  /**
   review_dive_shop_id
  */
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   user_id
  */
  @Column()
  userId: number;

  @ManyToOne(() => DiveShop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shopId' })
  diveShop: DiveShop;

  /**
   dive_shop_id
  */
  @Column()
  shopId: number;

  /**
   리뷰 내용
  */
  @Column()
  text: string;

  /**
   별점
  */
  @Column()
  star: number;

  /**
   좋아요
  */
  @Column({
    default: 0,
  })
  likes: number;

  @Column({
    default: 0,
  })
  dislikes: number;

  /**
   블락 여부
  */
  @Column({ default: false })
  isBlocked: boolean;
}

export default DiveShopReview;
