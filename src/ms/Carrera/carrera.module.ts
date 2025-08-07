// src/ms/Carrera/carrera.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { CarreraController } from './carrera.controller';
import { CarreraService } from './carrera.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera])],
  controllers: [CarreraController],
  providers: [CarreraService],
  exports: [CarreraService],
})
export class CarreraModule { }