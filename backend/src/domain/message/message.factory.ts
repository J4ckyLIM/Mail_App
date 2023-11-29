import { User } from '../user/user.entity';
import { userFactory } from '../user/user.factory';

import { Message } from './message.entity';

interface MessageFactoryArgs {
  title?: string;
  content?: string;
  writtenTo?: User;
  writtenBy?: User;
}

export const messageFactory = ({
  title = 'Important message',
  content = 'This is a very important message',
  writtenBy = userFactory({ email: 'user1@email.com' }),
  writtenTo = userFactory({ email: 'user2@email.com' }),
}: MessageFactoryArgs = {}) => {
  return new Message({ title, content, writtenBy, writtenTo });
};
