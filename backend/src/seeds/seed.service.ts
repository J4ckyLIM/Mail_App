import { Injectable, OnModuleInit } from '@nestjs/common';

import { MessageService } from '../services/message/message.service';
import { UserService } from '../services/user/user.service';

import { seedMessages } from './messages/seed-messages';
import { seedUsers } from './users/seed-users';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  async onModuleInit() {
    // Run the seed logic when the module is initialized
    await this.seedUsersAndMessages();
  }

  private async seedUsersAndMessages() {
    await this.seedUsers();
    await this.seedMessages();
  }

  private async seedUsers() {
    const usersToSeed = seedUsers;
    await Promise.all(usersToSeed.map(user => this.userService.create(user)));
  }

  private async seedMessages() {
    const messagesToSeed = seedMessages;
    await Promise.all(
      messagesToSeed.map(message => this.messageService.insert(message)),
    );
  }
}
