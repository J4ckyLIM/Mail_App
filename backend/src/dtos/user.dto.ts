import { ApiProperty } from '@nestjs/swagger';

import { UUIDv4 } from '../types';

export class UserDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id: UUIDv4;
}
