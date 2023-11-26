import { Column, Entity } from 'typeorm';

import { BaseEntity, BaseEntityCreateArgs } from '../base.entity';

export interface ExampleCreateArgs extends BaseEntityCreateArgs {
  name: string;
}

@Entity()
export class Example extends BaseEntity {
  @Column()
  name: string;

  constructor(props: ExampleCreateArgs) {
    super(props);
    this.name = props.name;
  }
}
