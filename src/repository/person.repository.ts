import { PersonEntity } from 'src/entities';
import { BaseAbstractRepository } from './base/base-abstract.repository';
import { PersonRepositoryInterface } from 'src/interfaces/repositories/person-repository.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonRepository
  extends BaseAbstractRepository<PersonEntity>
  implements PersonRepositoryInterface
{
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {
    super(personRepository);
  }
}
