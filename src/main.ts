import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './common/config/app-config';
import swaggerConfig from './common/config/swagger-config';
import env from './common/config/env-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig(app);
  swaggerConfig(app);

  const PORT = env.PORT ?? 3000;

  await app.listen(PORT);
}
bootstrap();
