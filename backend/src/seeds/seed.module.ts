import { Module } from '@nestjs/common';

import { MessageModule } from '../modules/message.module';
import { UserModule } from '../modules/user.module';

import { SeedService } from './seed.service';

@Module({
  imports: [UserModule, MessageModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
