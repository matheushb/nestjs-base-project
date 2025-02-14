import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './config/app-config';
import swaggerConfig from './config/swagger-config';
import { EnvConfigService } from './common/environment/environment/env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  appConfig(app);
  swaggerConfig(app);

  const envConfigService = app.get(EnvConfigService);

  await app.listen(envConfigService.getPort());
}
bootstrap();
