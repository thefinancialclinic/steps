import { Pool } from "pg";

export interface Repository<K,T> {
  getOne(id: K): Promise<T | null>;
  getAll(): Promise<T[]>;
  save(item: T): Promise<K | null>;
  delete(id: K): Promise<number>;
}
