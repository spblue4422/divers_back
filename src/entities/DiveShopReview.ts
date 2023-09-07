import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dive_shop_review')
class DiveShopReview {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  text: string;

  @Column({})
  star: number;

  @Column({
    default: 0,
  })
  likes: number;

  @Column({
    default: 0,
  })
  dislikes: number;
}

export default DiveShopReview;
