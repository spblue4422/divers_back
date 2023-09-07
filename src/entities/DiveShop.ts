import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dive_shop')
class DiveShop {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  name: string;

  @JoinColumn()
  countryCode: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  recommendation: number;

  @Column({ default: 0 })
  averageStar: number;
}

export default DiveShop;
