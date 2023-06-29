import { RoleEntity } from 'src/entities';
import { BaseAbstractRepository } from './base/base-abstract.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { RoleRepositoryInterface } from 'src/interfaces';

@Injectable()
export class RoleRepository
  extends BaseAbstractRepository<RoleEntity>
  implements RoleRepositoryInterface
{
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {
    super(roleRepository);
  }
}
