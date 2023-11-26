import { Column, Entity } from 'typeorm';

import { BaseEntity, BaseEntityCreateArgs } from '../base.entity';

export interface UserCreateArgs extends BaseEntityCreateArgs {
  name: string;
}

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  constructor(props: UserCreateArgs) {
    super(props);
    this.name = props.name;
  }
}
