import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import BasicDate from '@/entities/BasicDate';

@Entity('photo')
class Photo extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  savedPath: string;

  @Column()
  originalFileName: string;

  @Column()
  newFileName: string;
}

export default Photo;
