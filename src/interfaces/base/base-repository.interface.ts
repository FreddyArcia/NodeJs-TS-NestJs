import { Observable } from 'rxjs';
import { FindOneOptions } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  findAll(): Observable<T[]>;
  findOne(filterCondition: FindOneOptions<T>): Observable<T | null>;
  create(newData: T): Observable<T>;
  update(id: any, newData: any): Promise<any>;
  delete(id: any): Promise<any>;
}
