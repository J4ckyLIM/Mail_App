import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { Message } from '../src/domain/message/message.entity';
import { messageFactory } from '../src/domain/message/message.factory';
import { User } from '../src/domain/user/user.entity';
import { userFactory } from '../src/domain/user/user.factory';
import { JwtAuthGuard } from '../src/guard/jwt.guard';
import { MockJwtAuthGuard } from '../src/mock/jwt.guard.mock';
import { MessageService } from '../src/services/message/message.service';

describe('MessagesController (e2e)', () => {
  let app: INestApplication;
  let messageService: MessageService;
  let user: User;

  beforeAll(async () => {
    user = userFactory({ email: 'test@example.com' });
    const mockJwtAuthGuard = new MockJwtAuthGuard(user);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useFactory({ factory: () => mockJwtAuthGuard })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    messageService = moduleFixture.get<MessageService>(MessageService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/messages/all (GET)', () => {
    it('should return all messages for the user', async () => {
      const messages: Message[] = [messageFactory({ writtenTo: user })];

      jest
        .spyOn(messageService, 'findAllMessageReceivedByEmail')
        .mockResolvedValue(messages);

      const response = await request(app.getHttpServer())
        .get('/messages/all')
        .set('Authorization', 'Bearer testtoken')
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(messages.length);
    });
  });

  describe('/messages/sent (GET)', () => {
    it('should return all messages sent by the user', async () => {
      const messages: Message[] = [
        messageFactory({ writtenBy: user }),
        messageFactory({ writtenBy: user }),
        messageFactory({ writtenBy: user }),
      ];

      jest
        .spyOn(messageService, 'findAllMessageWrittenByEmail')
        .mockResolvedValue(messages);

      const response = await request(app.getHttpServer())
        .get('/messages/sent')
        .set('Authorization', 'Bearer testtoken')
        .expect(HttpStatus.OK);

      expect(response.body).toHaveLength(messages.length);
    });
  });

  describe('/message/:id (GET)', () => {
    it('should return a message by ID', async () => {
      const message: Message = messageFactory();

      jest
        .spyOn(messageService, 'findMessageByIdAndUpdateStatus')
        .mockResolvedValue(message);

      const response = await request(app.getHttpServer())
        .get(`/messages/${message.id}`)
        .set('Authorization', 'Bearer testtoken')
        .expect(HttpStatus.OK);

      expect(response.body.title).toEqual(message.title);
      expect(response.body.content).toEqual(message.content);
    });

    it('should return 404 if message is not found', async () => {
      const messageId = '999';

      jest
        .spyOn(messageService, 'findMessageByIdAndUpdateStatus')
        .mockRejectedValue(new Error(`Message with id ${messageId} not found`));

      await request(app.getHttpServer())
        .get(`/messages/${messageId}`)
        .set('Authorization', 'Bearer testtoken')
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/message (POST)', () => {
    it('should create a message if the user and recipient exist', async () => {
      const recipient: User = userFactory({
        email: 'existing-recipient@gmail.com',
      });

      const payload = {
        title: 'Hello',
        content: 'World',
        writtenTo: recipient.email,
      };

      const message: Message = messageFactory({
        ...payload,
        writtenBy: user,
        writtenTo: recipient,
      });

      jest.spyOn(messageService, 'create').mockResolvedValue(message);

      await request(app.getHttpServer())
        .post('/messages')
        .send(payload)
        .set('Authorization', 'Bearer testtoken')
        .expect(HttpStatus.CREATED);
    });
    it('should return 400 if the user or recipient does not exist', async () => {
      const recipient: User = userFactory({
        email: 'non-existing-recipient@gmail.com',
      });

      const payload = {
        title: 'Hello',
        content: 'World',
        writtenTo: recipient.email,
      };

      jest
        .spyOn(messageService, 'create')
        .mockRejectedValue(
          new Error(`User with email ${recipient.email} not found`),
        );

      await request(app.getHttpServer())
        .post('/messages')
        .send(payload)
        .set('Authorization', 'Bearer testtoken')
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
