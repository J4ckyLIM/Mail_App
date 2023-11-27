import { Controller, Get } from "@nestjs/common";
import { Message } from "../../domain/message/message.entity";
import { MessageService } from "../../services/message/message.service";

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  public async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }
}