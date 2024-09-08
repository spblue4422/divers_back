import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import DiveLog from '@/entities/DiveLog';

@Entity('photo_dive_log')
export class DiveLogPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DiveLog, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'logId' })
  diveLog: DiveLog;

  @Column()
  logId: number;

  @Column()
  order: number;
}
