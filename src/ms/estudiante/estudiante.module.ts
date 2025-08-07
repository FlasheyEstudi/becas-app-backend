// src/ms/estudiante/estudiante.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [EstudianteService],
})
export class EstudianteModule {}