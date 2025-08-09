// src/ms/Documento/Documento.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { DocumentoService } from './Documento.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';

@Controller('Documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post('/add')
  create(@Body() dto: CreateDocumentoDto) {
    return this.documentoService.create(dto);
  }

  @Get()
  findAll() {
    return this.documentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentoService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateDocumentoDto) {
    return this.documentoService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentoService.remove(Number(id));
  }
}