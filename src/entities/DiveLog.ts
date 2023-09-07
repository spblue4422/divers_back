import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dive_log')
class DiveLog {
  //스키마의 분리 필요 - 한 번에 볼 수 있는 정보 한정적 => 필수 정보만 두고 더 보기로 가져오면 어떨까
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  location: string;
}

export default DiveLog;
