import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Bind } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Bind(Request())
  async login(req: any) {
    return this.authService.login(req.user);
  }
}
