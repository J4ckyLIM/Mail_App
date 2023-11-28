import { Controller, Get, UseGuards, Request, Param, HttpStatus, HttpCode } from "@nestjs/common";
import { Message } from "../../domain/message/message.entity";
import { MessageService } from "../../services/message/message.service";
import { JwtAuthGuard } from "../../guard/jwt.guard";
import { UUIDv4 } from "src/types";

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllMessageForUser(@Request() req: any): Promise<Message[]> {
    return this.messageService.findAllMessageReceivedByEmail(req.user.email);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/sent')
  async getAllMessageSentByUser(@Request() req: any): Promise<Message[]> {
    return this.messageService.findAllMessageWrittenByEmail(req.user.email);
  }

  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getMessageById(@Param('id') id: UUIDv4): Promise<Message> {
    return this.messageService.findMessageByIdAndUpdateStatus(id);
  }
}