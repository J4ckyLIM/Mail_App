import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JWT_CONSTANT } from '../constant/constant';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthService } from '../services/auth/auth.service';
import { JwtStrategy } from '../strategies/auth/jwt.strategy';
import { LocalStrategy } from '../strategies/auth/local.strategy';

import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
