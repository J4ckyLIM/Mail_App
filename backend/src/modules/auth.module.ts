import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthService } from '../services/auth/auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from '../constant/constant';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/auth/local.strategy';
import { JwtStrategy } from '../strategies/auth/jwt.strategy';

@Module({
  imports: [UserModule, 
  JwtModule.register({
    global: true,
    secret: JWT_CONSTANT.secret,
    signOptions: { expiresIn: '1d' }
  }),
  PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
