import { ApiProperty } from '@nestjs/swagger';

import { UUIDv4 } from 'src/types';

export class CreateMessageDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  writtenTo: UUIDv4;
}

export class MessageDTO {
  @ApiProperty()
  id: UUIDv4;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  writtenBy: string;

  @ApiProperty()
  writtenTo: string;

  @ApiProperty()
  sentAt: Date;
}
