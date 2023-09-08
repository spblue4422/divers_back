import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DivePoint from './DivePoint';
import User from './User';

@Entity('dive_point_review')
class DivePointReview {
  @PrimaryGeneratedColumn()
  id: bigint;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => DivePoint)
  @JoinColumn({ name: 'pointId' })
  diveShop: DivePoint;

  @Column()
  pointId: number;

  @Column()
  text: string;

  @Column()
  star: number;

  @Column({
    default: 0,
  })
  likes: number;

  @Column({
    default: 0,
  })
  dislikes: number;

  @Column()
  shopName: string;
}

export default DivePointReview;
