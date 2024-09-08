import DiveShop from '@/entities/DiveShop';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photo_dive_shop')
export class DiveShopPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DiveShop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shopId' })
  divePoint: DiveShop;

  @Column()
  shopId: number;

  @Column()
  order: number;
}
