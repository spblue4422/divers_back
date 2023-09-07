import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('country')
class Country {
  @PrimaryColumn()
  countryCode: string;

  @Column()
  kName: string;

  @Column()
  eName: string;
}

export default Country;
