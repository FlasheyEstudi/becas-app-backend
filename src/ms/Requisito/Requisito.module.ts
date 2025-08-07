// src/ms/Requisito/Requisito.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requisito } from './entities/requisito.entity';
import { RequisitoService } from './Requisito.service';
import { RequisitoController } from './Requisito.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Requisito])],
  controllers: [RequisitoController],
  providers: [RequisitoService],
  exports: [RequisitoService],
})
export class RequisitoModule { }