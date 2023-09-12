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
}

export default Country;
