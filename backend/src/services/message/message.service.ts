import { Injectable } from "@nestjs/common";
import { BaseService } from "../base.service";
import { Message } from "../../domain/message/message.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";

interface MessageCreateDto {
  title: string;
  content: string;
  writtenBy: string; // email
  writtenTo: string; // email
}

@Injectable()
export class MessageService extends BaseService<Message> {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private userService: UserService,
  ) {
    super(messageRepository);
    this.userService = userService;
  }

  async create(props: MessageCreateDto): Promise<Message> {
    const writtenBy = await this.userService.findOneBy({ email: props.writtenBy });

    if(!writtenBy) {
      throw new Error(`User with email ${props.writtenBy} not found`);
    }

    const writtenTo = await this.userService.findOneBy({ email: props.writtenTo });

    if(!writtenTo) {
      throw new Error(`User with email ${props.writtenTo} not found`);
    }

    const newMessage = new Message({ ...props, writtenBy, writtenTo });
    return super.insert(newMessage);
  }

  async findAllMessageWrittenByEmail(email: string): Promise<Message[]> {
    const messagesWritten = await this.messageRepository.find({
      where: { writtenBy: { email } },
    })

    return messagesWritten;
  }

  async findAllMessageReceivedByEmail(email: string): Promise<Message[]> {
    const messagesReceived = await this.messageRepository.find({
      where: { writtenTo: { email } },
    })

    return messagesReceived;
  }
}