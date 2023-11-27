import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthService } from '../src/services/auth/auth.service';
import { AuthController } from '../src/controllers/auth/auth.controller';
import { LocalAuthGuard } from '../src/guard/local-auth.guard';
import { UserService } from '../src/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/domain/user/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService, {
        provide: getRepositoryToken(User),
        useValue: {
          findOneBy: jest.fn(),
        }
      }],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/auth/login (POST)', () => {
    it('should return the user token on successful login', async () => {
      const user = { email: 'testuser@example.com', password: 'testpassword' };
      const token = { access_token: 'testtoken' };

      jest.spyOn(authService, 'login').mockResolvedValue(token);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(user)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(token);
    });
  });

  describe('/auth/register (POST)', () => {
    it('should return the user token on successful registration', async () => {
      const payload = { name: 'testuser', email: 'testuser@example.com', password: 'testpassword' };
      const token = { access_token: 'testtoken' };

      jest.spyOn(authService, 'register').mockResolvedValue(token);

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(payload)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual(token);
    })
  });
});