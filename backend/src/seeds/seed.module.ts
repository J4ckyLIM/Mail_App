import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UserModule } from '../modules/user.module';
import { MessageModule } from '../modules/message.module';

@Module({
  imports: [UserModule, MessageModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}