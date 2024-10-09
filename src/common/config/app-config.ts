import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { PrismaClientExceptionFilter } from '../filters/prisma-exception.filter';

export default function appConfig(app: INestApplication<any>) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaClientExceptionFilter());
}
