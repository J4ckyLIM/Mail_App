import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Bind,
  Body,
  BadRequestException,
} from '@nestjs/common';

import { AccessTokenDTO, RegisterDTO } from '../../dtos/auth.dto';
import { LocalAuthGuard } from '../../guard/local-auth.guard';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<AccessTokenDTO> {
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  @Post('register')
  async register(@Body() body: RegisterDTO): Promise<AccessTokenDTO> {
    try {
      return this.authService.register(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
