import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptModule } from '../../common/bcrypt/bcrypt.module';
import envConfig from '../../common/config/env-config';
import { UserModule } from '../../modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    BcryptModule,
    PassportModule,
    JwtModule.register({
      secret: envConfig.JWT_SECRET,
      signOptions: { expiresIn: envConfig.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
