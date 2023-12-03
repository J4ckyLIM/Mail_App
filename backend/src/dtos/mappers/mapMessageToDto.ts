import { Message } from '../../domain/message/message.entity';
import { MessageDTO } from '../message.dto';

export const mapMessageToDto = (message: Message): MessageDTO => {
  return {
    id: message.id,
    title: message.title,
    content: message.content,
    writtenBy: message.writtenBy.email,
    writtenTo: message.writtenTo.email,
    sentAt: message.createdAt,
    hasBeenRead: message.hasBeenRead,
  };
};
