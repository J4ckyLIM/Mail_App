import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { userFactory } from '../../domain/user/user.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../domain/user/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService, {
        provide: getRepositoryToken(User),
        useValue: {
          findOneBy: jest.fn(),
        }
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return user if email and password are valid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const props = { email, password };
      const user = userFactory(props);

      jest.spyOn(userService, 'findOneBy').mockResolvedValue(user);

      const result = await service.validateUser(props);

      expect(result).toEqual(user);
    });

    it('should return null if email or password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const props = { email, password };
      const user = userFactory({ email, password: 'wrong_password' });

      jest.spyOn(userService, 'findOneBy').mockResolvedValue(user);

      const result = await service.validateUser(props);

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = userFactory({ email: 'test@example.com' });
      const accessToken = 'access_token';

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(accessToken);

      const result = await service.login(user);

      expect(result).toEqual({ access_token: accessToken });
    });
  });

  describe('register', () => {
    it('should create a user and return an access token', async () => {
      const props = { email: 'new@example.com', password: 'password', name: 'New User' };
      const user = userFactory(props);
      const token = 'token'
      const accessToken = { access_token: token };

      jest.spyOn(userService, 'create').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

      const result = await service.register(props);

      expect(result).toEqual(accessToken);
    })

    it('should throw an error if the user cannot be created', async () => {
      const props = { email: 'new@example.com', password: 'password', name: 'New User' };

      jest.spyOn(userService, 'create').mockRejectedValue(new Error('User already exists'));

      await expect(service.register(props)).rejects.toThrowError('User already exists');
    })
  })
});