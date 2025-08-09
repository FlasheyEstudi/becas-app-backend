// src/ms/CriterioEvaluacion/criterio-evaluacion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriterioEvaluacion } from './entities/criterio-evaluacion.entity';
import { CriterioEvaluacionService } from './CriterioEvaluacion.service';
import { CriterioEvaluacionController } from './CriterioEvaluacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CriterioEvaluacion])],
  providers: [CriterioEvaluacionService],
  controllers: [CriterioEvaluacionController],
})
export class CriterioEvaluacionModule {}