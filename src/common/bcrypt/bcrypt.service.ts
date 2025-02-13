import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EnvConfigService } from '../environment/environment/env-config/env-config.service';

@Injectable()
export class BcryptService {
  constructor(private readonly envConfigService: EnvConfigService) {}

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.envConfigService.getBcryptSalts());
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
