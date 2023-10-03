import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

// 그냥 delete하는게 낳을듯
@Entity('recommendation')
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: bigint;

  /**
   추천 대상 - 다이빙샵, 다이빙포인트, 샵 리뷰, 포인트 리뷰
  */
  @Column()
  target: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @Column()
  targetId: number;

  @CreateDateColumn()
  createdAt: Date;
}
