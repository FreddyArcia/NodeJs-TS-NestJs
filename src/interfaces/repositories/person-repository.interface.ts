import { PersonEntity } from 'src/entities';
import { BaseInterfaceRepository } from '../base/base-repository.interface';

export interface PersonRepositoryInterface
  extends BaseInterfaceRepository<PersonEntity> {}
