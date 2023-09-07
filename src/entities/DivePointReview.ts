import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dive_point_review')
class DivePointReview {
  @PrimaryGeneratedColumn()
  id: bigint;

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
