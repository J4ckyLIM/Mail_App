import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../domain/user/user.entity';
import { AccessTokenDTO, LoginDTO, RegisterDTO } from '../../dtos/auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(props: LoginDTO): Promise<User | null> {
    const { email, password } = props;
    const user = await this.userService.findOneBy({ email: email });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<AccessTokenDTO> {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async register(props: RegisterDTO): Promise<AccessTokenDTO> {
    try {
      const user = await this.userService.create(props);
      return this.login(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
