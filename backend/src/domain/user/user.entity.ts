import { Column, Entity } from 'typeorm';

import { BaseEntity, BaseEntityCreateArgs } from '../base.entity';

export interface UserCreateArgs extends BaseEntityCreateArgs {
  name: string;
  email: string;
  password: string;
}

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

  constructor(props: UserCreateArgs) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
}
