// src/ms/Estado/Estado.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from './entities/estado.entity';
import { EstadoController } from './Estado.controller';
import { EstadoService } from './Estado.service';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  controllers: [EstadoController],
  providers: [EstadoService],
  exports: [EstadoService],
})
export class EstadoModule {}