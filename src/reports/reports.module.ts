// src/ms/reports/reports.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { SolicitudBeca } from '../ms/SolicitudBeca/entities/solicitud-beca.entity';
import { Estudiante } from '../ms/estudiante/entities/estudiante.entity';
import { TipoBeca } from '../ms/TipoBeca/entities/tipo-beca.entity';
import { Carrera } from '../ms/Carrera/entities/carrera.entity';
import { Estado } from '../ms/Estado/entities/estado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitudBeca,
      Estudiante,
      TipoBeca,
      Carrera,
      Estado
    ])
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}