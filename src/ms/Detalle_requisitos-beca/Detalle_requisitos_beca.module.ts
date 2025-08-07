// src/ms/Detalle_requisitos-beca/Detalle_requisitos_beca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleRequisitosBeca } from './entities/detalle-requisitos-beca.entity';
import { Detalle_requisitos_becaController } from './Detalle_requisitos_beca.controller';
import { Detalle_requisitos_becaService } from './Detalle_requisitos_beca.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleRequisitosBeca])],
  controllers: [Detalle_requisitos_becaController],
  providers: [Detalle_requisitos_becaService],
  exports: [Detalle_requisitos_becaService],
})
export class Detalle_requisitos_becaModule { }