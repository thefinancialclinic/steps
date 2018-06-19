import { Pool } from 'pg';

export interface Repository<K, T> {
  get(conditions: {}): Promise<T[]>;
  getOne(id: K): Promise<T>;
  getAll(): Promise<T[]>;
  save(item: T): Promise<T>;
  delete(id: K): Promise<number>;

  // Updates can be on a subset of the columns
  // e.g. UPDATE task SET (title) = ('Title') WHERE id = 1;
  update(item: Partial<T>, id: K): Promise<T>;
}
