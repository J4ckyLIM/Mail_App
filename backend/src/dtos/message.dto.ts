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
