import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PersonEntity } from './person.entity';
import { RoleEntity } from './role.entity';

@Entity({
  name: 'sec_user',
  schema: 'security',
})
export class UserEntity {
  @Column({
    name: 'user_id',
    primary: true,
    type: 'uuid',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column({
    name: 'user_nickname',
    type: 'varchar',
    length: 50,
  })
  userNickname: string;

  @Column({
    name: 'user_password',
    type: 'varchar',
    length: 50,
  })
  userPassword: string;

  @OneToOne(() => PersonEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  ])
  person: PersonEntity;

  @Column({
    name: 'person_id',
  })
  personId: string;

  @ManyToOne(() => RoleEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: RoleEntity;

  @Column({
    name: 'role_id',
  })
  roleId: string;
}
