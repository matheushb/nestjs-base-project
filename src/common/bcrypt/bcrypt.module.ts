import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { EnvConfigModule } from '../environment/environment/env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
