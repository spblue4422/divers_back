import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Divers Api Swagger')
  .setDescription('Divers Api Description')
  .setVersion('0.0.0')
  .build();
