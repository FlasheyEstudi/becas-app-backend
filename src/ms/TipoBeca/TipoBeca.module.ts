import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoBeca } from './entities/tipo-beca.entity';
import { TipoBecaController } from './tipo-beca.controller';
import { TipoBecaService } from './tipo-beca.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoBeca]),
    AuthModule, // Si usas autenticación
  ],
  controllers: [TipoBecaController],
  providers: [TipoBecaService],
  exports: [TipoBecaService],
})
export class TipoBecaModule {}
