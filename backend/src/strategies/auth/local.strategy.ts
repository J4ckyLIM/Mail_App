import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from '../../dtos/auth.dto';
import { User } from '../../domain/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(props: LoginDto): Promise<User> {
    const user = await this.authService.validateUser(props.email, props.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}