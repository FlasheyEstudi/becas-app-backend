// src/ms/PeriodicoAcademico/PeriodoAcademico.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoAcademico } from './entities/periodo-academico.entity';
import { PeriodoAcademicoController } from './PeriodoAcademico.controller';
import { PeriodoAcademicoService } from './PeriodoAcademico.service';

@Module({
  imports: [TypeOrmModule.forFeature([PeriodoAcademico])],
  controllers: [PeriodoAcademicoController],
  providers: [PeriodoAcademicoService],
  exports: [PeriodoAcademicoService],
})
export class PeriodoAcademicoModule { }