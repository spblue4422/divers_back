import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import DivePoint from '@/entities/DivePoint';

@Entity('photo_dive_point')
export class DivePointPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DivePoint, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pointId' })
  divePoint: DivePoint;

  @Column()
  pointId: number;

  @Column()
  order: number;
}
