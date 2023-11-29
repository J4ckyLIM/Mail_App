import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../domain/user/user.entity';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userProps = {
        name: 'example',
        email: 'example@gmail.com',
        password: 'example',
      };

      jest.spyOn(userRepository, 'save').mockResolvedValue(new User(userProps));

      const result = await userService.create(userProps);

      expect(result).toBeInstanceOf(User);
      expect(result.id).toBeDefined();
      expect(result.name).toBe(userProps.name);
      expect(result.email).toBe(userProps.email);
      expect(result.password).toBe(userProps.password);
    });

    it('should throw an error if the email of the user already exists', async () => {
      const userProps = {
        name: 'example',
        email: 'example@gmail.com',
        password: 'example',
      };
      const existingUser = new User(userProps);

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(existingUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(new User(userProps));

      await expect(userService.create(userProps)).rejects.toThrowError(
        `User with email ${userProps.email} already exists`,
      );
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateProps = { name: 'updatedName' };
      const existingUser = new User({
        name: 'example',
        email: 'example@gmail.com',
        password: 'example',
      });

      const { id } = existingUser;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(existingUser);
      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValue({ ...existingUser, ...updateProps } as User);

      const result = await userService.update(id, updateProps);

      expect(result.id).toBe(id);
      expect(result.name).toBe(updateProps.name);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(userRepository.update).toHaveBeenCalledWith(id, updateProps);
    });

    it('should throw an error if the user id does not exist', async () => {
      const fakeId = '12345';
      const updateProps = {
        name: 'updatedName',
        email: 'updatedEmail@gmail.com',
        password: 'updatedPassword',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(
        userService.update(fakeId, updateProps),
      ).rejects.toThrowError(`User with id ${fakeId} not found`);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: fakeId });
      expect(userRepository.update).not.toHaveBeenCalled();
    });
  });
});
