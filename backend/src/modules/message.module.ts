import { Module } from "@nestjs/common";
import { MessageController } from "../controllers/message/message.controller";
import { MessageService } from "../services/message/message.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "../domain/message/message.entity";
import { UserModule } from "./user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}