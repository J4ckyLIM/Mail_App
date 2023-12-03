import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesController } from '../controllers/messages/messages.controller';
import { Message } from '../domain/message/message.entity';
import { MessageService } from '../services/message/message.service';

import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule],
  providers: [MessageService],
  controllers: [MessagesController],
  exports: [MessageService],
})
export class MessageModule {}
