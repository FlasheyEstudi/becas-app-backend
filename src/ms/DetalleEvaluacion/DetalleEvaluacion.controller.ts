// src/ms/DetalleEvaluacion/DetalleEvaluacion.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { DetalleEvaluacionService } from './DetalleEvaluacion.service';
import { CreateDetalleEvaluacionDto } from './dto/create-detalle-evaluacion.dto';

@Controller('DetalleEvaluacion')
export class DetalleEvaluacionController {
  constructor(private readonly detalleEvaluacionService: DetalleEvaluacionService) {}

  @Post('/add')
  create(@Body() dto: CreateDetalleEvaluacionDto) {
    return this.detalleEvaluacionService.create(dto);
  }

  @Get()
  findAll() {
    return this.detalleEvaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleEvaluacionService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateDetalleEvaluacionDto) {
    return this.detalleEvaluacionService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleEvaluacionService.remove(Number(id));
  }
}