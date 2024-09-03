import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('country')
class Country {
  /**
   국가 코드
  */
  @PrimaryColumn()
  countryCode: string;

  /**
   한글 명
  */
  @Column()
  kName: string;

  /**
   영어 명
  */
  @Column()
  eName: string;

  /**
   간단한 설명
  */
  @Column({ default: '' })
  description: string;

  /**
   국기 사진?
  */

  /**
   다른 사진?
  */
}

export default Country;
