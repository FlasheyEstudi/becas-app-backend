// src/ms/DetalleEvaluacion/detalle-evaluacion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEvaluacion } from './entities/detalle-evaluacion.entity';
import { DetalleEvaluacionService } from './DetalleEvaluacion.service';
import { DetalleEvaluacionController } from './DetalleEvaluacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleEvaluacion])],
  providers: [DetalleEvaluacionService],
  controllers: [DetalleEvaluacionController],
})
export class DetalleEvaluacionModule {}