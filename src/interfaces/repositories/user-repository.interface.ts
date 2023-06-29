import { UserEntity } from 'src/entities';
import { BaseInterfaceRepository } from '../base/base-repository.interface';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {}
