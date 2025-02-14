import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { PrismaClientExceptionFilter } from '@/common/filters/prisma-exception.filter';
import { INestApplication, ValidationPipe } from '@nestjs/common';

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
