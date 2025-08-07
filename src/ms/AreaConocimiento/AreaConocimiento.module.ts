// src/ms/AreaConocimiento/AreaConocimiento.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaConocimiento } from './entities/area-conocimiento.entity';
import { AreaConocimientoController } from './AreaConocimiento.controller';
import { AreaConocimientoService } from './AreaConocimiento.service';

@Module({
  imports: [TypeOrmModule.forFeature([AreaConocimiento])],
  controllers: [AreaConocimientoController],
  providers: [AreaConocimientoService],
  exports: [AreaConocimientoService],
})
export class AreaConocimientoModule { }