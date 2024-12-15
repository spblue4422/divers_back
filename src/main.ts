import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@/app.module';
import { AllExceptionFilter } from '@/common/utils/errorHandler';
import { DiversSwaggerConfig } from '@/config/swagger';
import expressBasicAuth from 'express-basic-auth';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.use(
    ['/docs'],
    expressBasicAuth({
      challenge: true,
      users: {
        [app.get(ConfigService).get('SWAGGER_ID')]: app
          .get(ConfigService)
          .get('SWAGGER_PASSWORD'),
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, DiversSwaggerConfig);
  if (process.env.NODE_ENV != 'prod')
    SwaggerModule.setup('docs', app, document);

  //openapi.json으로 추가
  const openApiJson = JSON.stringify(document, null, 2);
  writeFileSync(join(process.cwd(), 'openapi.json'), openApiJson);

  // Serve OpenAPI JSON file
  app.use('/openapi.json', (req, res) => {
    res.send(openApiJson);
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter({ httpAdapter }));

  await app.listen(app.get(ConfigService).get('PORT'));
}
bootstrap();
