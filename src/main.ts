import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api-beca'); // Agrega prefijo /api-beca globalmente
  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
  await app.listen(3000);
}
bootstrap();