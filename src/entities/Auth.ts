import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BasicDate } from './BasicDate';

@Entity('auth')
class Auth extends BasicDate {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   로그인 아이디
  */
  @Column({ unique: true })
  loginId: string;

  /**
   salt(암호화) 값
  */
  @Column()
  salt: string;

  /**
   암호화된 비밀번호
  */
  @Column()
  password: string;

  /**
   리프레쉬 토큰
  */
  @Column({ nullable: true })
  refreshToken: string;

  /**
   회원가입 타입 - 필요한가??
  */
  //@Column()
  //joinType: string;

  /**
   user - 0 / shop - 1 / admin - 888 구분
   */
  @Column()
  role: number;

  /**
   밴 여부
  */
  @Column({ default: false })
  isBanned: boolean;

  /**
    밴 사유
   */
  @Column({ nullable: true, default: null })
  banReason: string;

  /**
    밴 풀리는 날짜
   */
  @Column({ nullable: true, default: null })
  banFreeDate: Date;
}

export default Auth;
