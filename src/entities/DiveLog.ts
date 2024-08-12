import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BasicDate, DivePoint, DiveShop, Tour, User } from '@/entities/index';

@Entity('dive_log')
class DiveLog extends BasicDate {
  /**
   dive_log_id
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

  @ManyToOne(() => Tour)
  @JoinColumn({ name: 'tourId' })
  tour: Tour;

  @Column({ nullable: true })
  tourId: number;

  @ManyToOne(() => DiveShop)
  @JoinColumn({ name: 'shopId' })
  diveShop: DiveShop;

  /**
   dive_shop_id
  */
  @Column({ nullable: true })
  shopId: number;

  /**
   다이브샵 상호명
  */
  @Column({ nullable: true })
  shopName: string;

  @ManyToOne(() => DivePoint)
  @JoinColumn({ name: 'pointId' })
  divePoint: DivePoint;

  /**
   dive_point_id
  */
  @Column({ nullable: true })
  pointId: number;

  /**
   다이브 포이트 이름
  */
  @Column()
  pointName: string;

  /**
   포인트 위치
  */
  @Column({ nullable: true })
  location: string;

  /**
   버디
  */
  @Column({ nullable: true })
  buddy: string;

  /**
   다이빙 날짜
  */
  @Column()
  diveDate: Date;

  /**
   로그 공개 여부
  */
  @Column({ default: false })
  isPublic: boolean;

  /**
   로그 블락 여부
  */
  @Column({ default: false })
  isBlocked: boolean;

  /**
   로그 블락 사유
  */
  @Column({ nullable: true })
  blockReason: string;
}

export default DiveLog;
