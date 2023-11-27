import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { Message } from '../../domain/message/message.entity';
import { User } from '../../domain/user/user.entity';
import { userFactory } from '../../domain/user/user.factory';

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
    messageRepository = module.get<Repository<Message>>(getRepositoryToken(Message));
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

      const newMessage = new Message({ ...props, writtenBy: writtenByUser, writtenTo: writtenToUser });

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

      await expect(messageService.create(props)).rejects.toThrowError(`User with email ${props.writtenBy} not found`);
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

      await expect(messageService.create(props)).rejects.toThrowError(`User with email ${props.writtenTo} not found`);
    });
  });
});