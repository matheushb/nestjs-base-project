import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function swaggerConfig(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customfavIcon: '/assets/favicon.ico',
    customSiteTitle: 'NestJS Base API',
    customCss: '.topbar { display: none }',
  });
}
