import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api-beca');

  app.enableCors({
    origin: 'http://localhost:4200',  // Cambia aquí al puerto que usa tu frontend
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
