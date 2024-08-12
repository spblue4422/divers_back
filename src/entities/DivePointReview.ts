import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import BasicDate from '@/entities/BasicDate';
import { DivePoint, DiveShop, User } from '@/entities/index';

@Entity('review_dive_point')
class DivePointReview extends BasicDate {
  /**
   review_dive_point_id
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

  // 내가 shop을 넣은 이유가 뭐지?
  @ManyToOne(() => DiveShop)
  @JoinColumn({ name: 'shopId' })
  diveShop: DiveShop;

  /**
   dive_shop_id
  */
  @Column({ nullable: true })
  shopId: number;

  /**
   다이브 샵 이름
  */
  @Column({ default: '' })
  shopName: string;

  @ManyToOne(() => DivePoint, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pointId' })
  divePoint: DivePoint;

  /**
   dive_point_id
  */
  @Column()
  pointId: number;

  /**
   리뷰 내용
  */
  @Column()
  text: string;

  /**
   별점
  */
  @Column({ type: 'decimal', precision: 3, scale: 1 })
  star: number;

  /**
   좋아요
  */
  @Column({ default: 0 })
  recommendation: number;

  /**
   블락 여부
  */
  @Column({ default: false })
  isBlocked: boolean;
}

export default DivePointReview;
