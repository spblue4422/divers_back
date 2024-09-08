import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import DiveShopReview from '@/entities/DiveShopReview';

@Entity('photo_review_dive_shop')
export class DiveShopReviewPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DiveShopReview, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewId' })
  diveShopReview: DiveShopReview;

  @Column()
  reviewId: number;

  @Column()
  order: number;
}
