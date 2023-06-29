import { Column, Entity } from 'typeorm';

@Entity({
  name: 'sec_role',
  schema: 'security',
})
export class RoleEntity {
  @Column({
    name: 'role_id',
    primary: true,
    type: 'uuid',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column({
    name: 'role_name',
    type: 'varchar',
    length: 50,
  })
  roleName: string;
}
