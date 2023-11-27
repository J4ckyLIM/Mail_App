import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserCreateArgs, UserUpdateArgs } from '../../domain/user/user.entity';
import { BaseService } from '../base.service';
import { UUIDv4 } from '../../types';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(props: UserCreateArgs): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email: props.email });

    if (existingUser) {
      throw new Error(`User with email ${props.email} already exists`);
    }

    const newUser = new User(props);
    return super.insert(newUser);
  }

  async update(id: UUIDv4, props: UserUpdateArgs): Promise<User> {
    const user = await super.findOneBy({ id });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    await this.userRepository.update(id, props);
    return super.findOneBy({ id });
  }
}
