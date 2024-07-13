import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import { BasicDate } from './BasicDate';

// 그냥 delete하는게 낳을듯
@Entity('recommendation')
class Recommendation extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   추천 대상 - 다이빙샵, 다이빙포인트, 샵 리뷰, 포인트 리뷰
  */
  @Column()
  target: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @Column()
  targetId: number;
}

export default Recommendation;
