import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Country from 'src/common/entities/country';

@Entity('dive_point')
class DivePoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryCode' })
  country: Country;

  @Column()
  countryCode: string;

  @Column()
  location: string;

  @Column({ default: 0 })
  recommendation: number;

  //평균 평점을 각 테이블에 굳이 저장해야할까?
  @Column({ default: 0 })
  averageStar: number;
}

export default DivePoint;
