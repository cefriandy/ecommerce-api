import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';
import * as rTracer from 'cls-rtracer';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guard/jwt.auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);

  const servicePort = configService.get<number>('PORT') || 3000;
  const serviceName = configService.get<string>('npm_package_name') || 'App';
  const serviceVersion = configService.get<string>('npm_package_version') || '1.0.0';

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.use(rTracer.expressMiddleware({ useHeader: true, echoHeader: true }));

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ecommerce API')
    .setVersion(serviceVersion)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync('openapi.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  await app.listen(servicePort, () => {
    console.info(`Application ${serviceName}:${serviceVersion} running on port ${servicePort}`);
  });
}

bootstrap();