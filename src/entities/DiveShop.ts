import Country from 'src/common/entities/country';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dive_shop')
class DiveShop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryCode' })
  country: Country;

  @Column()
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
