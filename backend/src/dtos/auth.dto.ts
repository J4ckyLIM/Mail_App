import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class LoginDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @ApiProperty()
  name: string;
}

export class AccessTokenDTO {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: UserDTO })
  user: UserDTO;
}
