import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  HttpStatus,
  HttpCode,
  Body,
  Post,
  BadRequestException,
  NotFoundException,
  Patch,
} from '@nestjs/common';

import { UUIDv4 } from 'src/types';

import { Message } from '../../domain/message/message.entity';
import { mapMessageToDto } from '../../dtos/mappers/mapMessageToDto';
import {
  CreateMessageDTO,
  MessageDTO,
  UpdateMessageDTO,
} from '../../dtos/message.dto';
import { JwtAuthGuard } from '../../guard/jwt.guard';
import { MessageService } from '../../services/message/message.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllMessageForUser(@Request() req: any): Promise<MessageDTO[]> {
    const messages = await this.messageService.findAllMessageReceivedByEmail(
      req.user.email,
    );
    return messages.map(mapMessageToDto);
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
    try {
      const message = await this.messageService.findMessageByIdAndUpdateStatus(
        id,
      );
      return message;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(
    @Request() req: any,
    @Body() body: CreateMessageDTO,
  ): Promise<Message> {
    try {
      const result = await this.messageService.create({
        ...body,
        writtenBy: req.user.email,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateMessageStatus(
    @Param('id') id: UUIDv4,
    @Body() body: UpdateMessageDTO,
  ): Promise<Message> {
    try {
      const result = await this.messageService.update(id, body);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
