import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { BcryptModule } from '@/common/bcrypt/bcrypt.module';
import { EnvConfigModule } from '@/common/environment/environment/env-config/env-config.module';
import { EnvConfigService } from '@/common/environment/environment/env-config/env-config.service';

@Module({
  imports: [
    UserModule,
    EnvConfigModule,
    BcryptModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (envConfig: EnvConfigService) => ({
        secret: envConfig.getJwtSecret(),
        signOptions: { expiresIn: envConfig.getJwtExpiresIn() },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
