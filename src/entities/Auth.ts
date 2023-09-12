import { Column } from 'typeorm';
import { BasicDate } from './BasicDate';

export abstract class Auth extends BasicDate {
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
   회원가입 타입
  */
  @Column()
  joinType: string;
}
