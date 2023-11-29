import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Message } from '../../domain/message/message.entity';
import { messageFactory } from '../../domain/message/message.factory';
import { User } from '../../domain/user/user.entity';
import { userFactory } from '../../domain/user/user.factory';
import { UserService } from '../user/user.service';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;
  let userService: UserService;
  let messageRepository: Repository<Message>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        UserService,
        {
          provide: getRepositoryToken(Message),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    messageService = module.get<MessageService>(MessageService);
    userService = module.get<UserService>(UserService);
    messageRepository = module.get<Repository<Message>>(
      getRepositoryToken(Message),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new message', async () => {
      const writtenByUser = userFactory({ email: 'user1@gmail.com' });
      const writtenToUser = userFactory({ email: 'user2@gmail.com' });

      const props = {
        title: 'Important message',
        writtenBy: writtenByUser.email,
        writtenTo: writtenToUser.email,
        content: 'Hello, world!',
      };

      const newMessage = new Message({
        ...props,
        writtenBy: writtenByUser,
        writtenTo: writtenToUser,
      });

      jest.spyOn(userService, 'findOneBy').mockResolvedValue(writtenByUser);
      jest.spyOn(userService, 'findOneBy').mockResolvedValue(writtenToUser);
      jest.spyOn(messageRepository, 'save').mockResolvedValue(newMessage);

      const result = await messageService.create(props);

      expect(result).toBeInstanceOf(Message);
      expect(result.writtenBy).toBe(writtenByUser);
      expect(result.writtenTo).toBe(writtenToUser);
      expect(result.content).toBe(props.content);
    });

    it('should throw an error if the writtenBy user does not exist', async () => {
      const props = {
        title: 'Not so important message',
        writtenBy: 'nonexistent@example.com',
        writtenTo: 'another@example.com',
        content: 'Hello, world!',
      };

      jest.spyOn(userService, 'findOneBy').mockResolvedValueOnce(undefined);

      await expect(messageService.create(props)).rejects.toThrowError(
        `User with email ${props.writtenBy} not found`,
      );
    });

    it('should throw an error if the writtenTo user does not exist', async () => {
      const writtenByUser = userFactory({ email: 'example@gmail.com' });

      const props = {
        title: 'Not so important message',
        writtenBy: writtenByUser.email,
        writtenTo: 'nonexistent@example.com',
        content: 'Hello, world!',
      };

      jest.spyOn(userService, 'findOneBy').mockResolvedValueOnce(writtenByUser);
      jest.spyOn(userService, 'findOneBy').mockResolvedValueOnce(undefined);

      await expect(messageService.create(props)).rejects.toThrowError(
        `User with email ${props.writtenTo} not found`,
      );
    });
  });

  describe('findAllMessageWrittenByEmail', () => {
    it('should return all messages written by the given email', async () => {
      const writer = userFactory({ email: 'writter@gmail.com' });
      const messagesWritten = [
        messageFactory({ writtenBy: writer }),
        messageFactory({ writtenBy: writer }),
      ];

      jest.spyOn(messageRepository, 'find').mockResolvedValue(messagesWritten);

      const result = await messageService.findAllMessageWrittenByEmail(
        writer.email,
      );

      expect(result).toEqual(messagesWritten);
      expect(result).toHaveLength(2);
    });
  });

  describe('findAllMessageReceivedByEmail', () => {
    it('should return all messages received by the given email', async () => {
      const receiver = userFactory({ email: 'receiver@gmail.com' });
      const messagesReceived = [
        messageFactory({ writtenTo: receiver }),
        messageFactory({ writtenTo: receiver }),
      ];

      jest.spyOn(messageRepository, 'find').mockResolvedValue(messagesReceived);

      const result = await messageService.findAllMessageReceivedByEmail(
        receiver.email,
      );

      expect(result).toEqual(messagesReceived);
      expect(result).toHaveLength(2);
    });
  });

  describe('findMessageByIdAndUpdateStatus', () => {
    it('should find a message by its id and update its status to hasBeenRead = true', async () => {
      const message = messageFactory();
      const updatedMessage = { ...message, hasBeenRead: true } as Message;

      jest.spyOn(messageRepository, 'findOneBy').mockResolvedValue(message);
      jest.spyOn(messageRepository, 'save').mockResolvedValue(updatedMessage);
      jest
        .spyOn(messageRepository, 'findOneBy')
        .mockResolvedValue(updatedMessage);

      const result = await messageService.findMessageByIdAndUpdateStatus(
        message.id,
      );

      expect(result).toEqual(updatedMessage);
      expect(result.hasBeenRead).toBe(true);
    });
  });
});
