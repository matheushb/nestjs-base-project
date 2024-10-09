import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import envConfig from '../config/env-config';

@Injectable()
export class BcryptService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, envConfig.BCRYPT_SALTS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
