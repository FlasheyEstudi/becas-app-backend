// src/ms/Evaluacion/Evaluacion.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { EvaluacionService } from './Evaluacion.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';

@Controller('Evaluacion')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post('/add')
  create(@Body() dto: CreateEvaluacionDto) {
    return this.evaluacionService.create(dto);
  }

  @Get()
  findAll() {
    return this.evaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluacionService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateEvaluacionDto) {
    return this.evaluacionService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluacionService.remove(Number(id));
  }
}