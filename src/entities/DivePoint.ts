import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dive_point')
class DivePoint {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinColumn()
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
