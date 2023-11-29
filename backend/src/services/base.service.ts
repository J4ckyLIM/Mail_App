import {
  FindOptionsWhere,
  FindOptionsWhereProperty,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';

import { UUIDv4 } from 'src/types/UUID';

export class BaseService<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async insert(props: T): Promise<T> {
    return this.repository.save(props);
  }

  async update(id: UUIDv4, props: Partial<T>): Promise<T> {
    await this.repository.update(id, { ...props });
    return this.findOneBy({ id } as unknown as Partial<T>);
  }

  async delete(id: UUIDv4): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOneBy(props: Partial<T>): Promise<T | undefined> {
    return this.repository.findOneBy(props as FindOptionsWhere<T>);
  }
}
