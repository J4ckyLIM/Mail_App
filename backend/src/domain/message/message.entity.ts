import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity, BaseEntityCreateArgs } from '../base.entity';
import { User } from '../user/user.entity';

export interface MessageCreateArgs extends BaseEntityCreateArgs {
  title: string;
  content: string;
  writtenBy: User;
  writtenTo: User;
}

@Entity()
export class Message extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  hasBeenRead: boolean;

  @ManyToOne(() => User, user => user.messagesWritten)
  writtenBy: User;

  @ManyToOne(() => User, user => user.messagesReceived)
  writtenTo: User;

  constructor(props: MessageCreateArgs) {
    super(props);
    this.title = props.title;
    this.content = props.content;
    this.writtenBy = props.writtenBy;
    this.writtenTo = props.writtenTo;
    this.hasBeenRead = false;
  }
}
