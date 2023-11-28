import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { MessageService } from '../src/services/message/message.service';
import { Message } from '../src/domain/message/message.entity';
import { messageFactory } from '../src/domain/message/message.factory';
import { userFactory } from '../src/domain/user/user.factory';
import { JwtAuthGuard } from '../src/guard/jwt.guard';
import { MockJwtAuthGuard } from '../src/mock/jwt.guard.mock';
import { User } from '../src/domain/user/user.entity';

describe('MessagesController (e2e)', () => {
  let app: INestApplication;
  let messageService: MessageService;
  let user: User;

  beforeAll(async () => {
    user = userFactory({ email: 'test@example.com' })
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

      jest.spyOn(messageService, 'findAllMessageReceivedByEmail').mockResolvedValue(messages);

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

      jest.spyOn(messageService, 'findAllMessageWrittenByEmail').mockResolvedValue(messages);

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

      jest.spyOn(messageService, 'findMessageByIdAndUpdateStatus').mockResolvedValue(message);

      const response = await request(app.getHttpServer())
        .get(`/messages/${message.id}`)
        .set('Authorization', 'Bearer testtoken')
        .expect(HttpStatus.OK);

      expect(response.body.title).toEqual(message.title);
      expect(response.body.content).toEqual(message.content);
    });

    it('should return 404 if message is not found', async () => {
      const messageId = '999';

      jest.spyOn(messageService, 'findMessageByIdAndUpdateStatus').mockResolvedValue(null);

      await request(app.getHttpServer())
        .get(`/message/${messageId}`)
        .set('Authorization', 'Bearer testtoken')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});