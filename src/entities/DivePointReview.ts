import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BasicDate, DivePoint, DiveShop, User } from '@/entities/index';

// import DivePoint from './DivePoint';
// import DiveShop from './DiveShop';
// import User from './User';
// import { BasicDate } from '@/entities/index/BasicDate';

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
  @Column()
  star: number;

  /**
   좋아요
  */
  @Column({
    default: 0,
  })
  likes: number;

  /**
   싫어요 - 이거보다 그냥 신고를 두는게 나으려나?
  */
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

export default DivePointReview;
