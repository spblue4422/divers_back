import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import DivePointReview from '@/entities/DivePointReview';

@Entity('photo_review_dive_point')
export class DivePointReviewPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DivePointReview, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewId' })
  divePointReview: DivePointReview;

  @Column()
  reviewId: number;

  @Column()
  order: number;
}
