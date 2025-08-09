// src/ms/Documento/documento.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from './entities/documento.entity';
import { DocumentoService } from './Documento.service';
import { DocumentoController } from './Documento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Documento])],
  providers: [DocumentoService],
  controllers: [DocumentoController],
})
export class DocumentoModule {}