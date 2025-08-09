// src/ms/Evaluacion/evaluacion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { EvaluacionService } from './Evaluacion.service';
import { EvaluacionController } from './Evaluacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion])],
  providers: [EvaluacionService],
  controllers: [EvaluacionController],
})
export class EvaluacionModule {}