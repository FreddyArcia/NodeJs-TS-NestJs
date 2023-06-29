import { NotFoundException } from '@nestjs/common/exceptions';
import { Observable, from } from 'rxjs';
import { BaseInterfaceRepository } from 'src/interfaces/base/base-repository.interface';
import { FindOneOptions, Repository } from 'typeorm';

interface HasId {
  id: string;
}

export abstract class BaseAbstractRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  constructor(private readonly entity: Repository<T>) {}
  findAll(): Observable<T[]> {
    return from(this.entity.find());
  }
  findOne(filterCondition: FindOneOptions<T>): Observable<T | null> {
    return from(this.entity.findOne(filterCondition));
  }

  getByCondition(filterCondition: FindOneOptions<T>): Promise<T | null> {
    return this.entity.findOne(filterCondition);
  }
  create(item: T): Observable<T> {
    return from(this.entity.save(item));
  }

  async update(id: any, item: any): Promise<T> {
    const options = {
      ...item,
      id: id,
    };
    const record = await this.entity.preload(options);
    if (record) {
      return await this.entity.save(record);
    } else throw new NotFoundException(`record not found ${id}`);
  }

  async delete(id: string): Promise<any> {
    return await this.entity.delete(id);
  }
}
