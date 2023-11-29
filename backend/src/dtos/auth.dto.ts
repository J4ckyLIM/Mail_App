import { ApiProperty } from '@nestjs/swagger';

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
}
