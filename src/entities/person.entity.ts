import { Column, Entity } from 'typeorm';

@Entity({
  name: 'sec_person',
  schema: 'security',
})
export class PersonEntity {
  @Column({
    name: 'person_id',
    primary: true,
    type: 'uuid',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column({
    name: 'person_name',
    type: 'varchar',
    length: 50,
  })
  personName: string;

  @Column({
    name: 'person_last_name',
    type: 'varchar',
    length: 50,
  })
  personLastName: string;

  @Column({
    name: 'person_email',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  personMail: string;

  @Column({
    name: 'person_phone',
    type: 'varchar',
    length: 50,
  })
  personPhone: string;
}
