import { Column, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import BasicDate from '@/entities/BasicDate';
import { Auth } from '@/entities/index';

class Admin extends BasicDate {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Auth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authHandle', referencedColumnName: 'handle' })
  auth: Auth;

  @Column()
  authHandle: string;

  @Column()
  name: string;

  // 어드민 내부에서도 권한을 나눌거라면 사용
  //@Column()
  //adminRole: string;
}

export default Admin;
