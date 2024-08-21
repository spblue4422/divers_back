import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const DiversSwaggerConfig = new DocumentBuilder()
  .setTitle('Divers Api Swagger')
  .setDescription('Divers Api Description')
  .setVersion('0.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      in: 'header',
    },
    'accessToken',
  )
  .build();

// export const DiversSwaggerOption: SwaggerCustomOptions = {};
