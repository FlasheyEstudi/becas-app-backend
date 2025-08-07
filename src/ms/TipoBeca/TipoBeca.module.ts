// src/ms/TipoBeca/TipoBeca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoBeca } from './entities/tipo-beca.entity';
import { TipoBecaController } from './TipoBeca.controller';
import { TipoBecaService } from './TipoBeca.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoBeca])],
  controllers: [TipoBecaController],
  providers: [TipoBecaService],
  exports: [TipoBecaService],
})
export class TipoBecaModule { }