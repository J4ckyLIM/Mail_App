import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UUIDv4 } from 'src/types';

export type BaseEntityCreateArgs = {
  id?: UUIDv4;
};

export abstract class BaseEntity {
  @PrimaryColumn('uuid')
  id: UUIDv4;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  // Warning: Constructor is not called by TypeORM when deserializing the entity
  constructor(props: BaseEntityCreateArgs) {
    this.id = props.id ?? uuidv4();

    const now = new Date();
    this.createdAt = now;
    this.lastUpdatedAt = now;
  }
}
