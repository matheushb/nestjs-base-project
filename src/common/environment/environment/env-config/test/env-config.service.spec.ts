import { ConfigService } from '@nestjs/config';
import { EnvConfigService } from '../env-config.service';

describe('Teste envconfig', () => {
  const envConfigService = new EnvConfigService(new ConfigService());

  it('should check if node_env exists', () => {
    expect(envConfigService.getNodeEnv()).toBeDefined();
  });

  it('should check if database_url exists', () => {
    expect(envConfigService.getDatabaseUrl()).toBeDefined();
  });

  it('should check if jwt_secret exists', () => {
    expect(envConfigService.getJwtSecret()).toBeDefined();
  });

  it('should check if jwt_expires_in exists', () => {
    expect(envConfigService.getJwtExpiresIn()).toBeDefined();
  });

  it('should check if bcrypt_salts exists', () => {
    expect(envConfigService.getBcryptSalts()).toBeDefined();
  });
});
