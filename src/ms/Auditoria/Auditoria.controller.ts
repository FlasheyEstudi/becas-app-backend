// src/ms/Auditoria/Auditoria.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { AuditoriaService } from './Auditoria.service';
import { CreateAuditoriaDto } from './dto/create-auditoria.dto';

@Controller('Auditoria')
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  @Post('/add')
  create(@Body() dto: CreateAuditoriaDto) {
    return this.auditoriaService.create(dto);
  }

  @Get()
  findAll() {
    return this.auditoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditoriaService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateAuditoriaDto) {
    return this.auditoriaService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditoriaService.remove(Number(id));
  }
}