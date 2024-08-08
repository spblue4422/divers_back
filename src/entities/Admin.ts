import { Column, PrimaryColumn } from 'typeorm';
import { BasicDate } from './BasicDate';

class Admin extends BasicDate {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  // 어드민 내부에서도 권한을 나눌거라면 사용
  //@Column()
  //adminRole: string;
}

export default Admin;
