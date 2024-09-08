import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import BasicDate from '@/entities/BasicDate';

abstract class Photo extends BasicDate {
  @Column()
  savedPath: string;

  @Column()
  originalFileName: string;

  @Column()
  newFileName: string;
}

export default Photo;
