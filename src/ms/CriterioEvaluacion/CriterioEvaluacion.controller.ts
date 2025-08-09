// src/ms/CriterioEvaluacion/CriterioEvaluacion.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CriterioEvaluacionService } from './CriterioEvaluacion.service';
import { CreateCriterioEvaluacionDto } from './dto/create-criterio-evaluacion.dto';

@Controller('CriterioEvaluacion')
export class CriterioEvaluacionController {
  constructor(private readonly criterioEvaluacionService: CriterioEvaluacionService) {}

  @Post('/add')
  create(@Body() dto: CreateCriterioEvaluacionDto) {
    return this.criterioEvaluacionService.create(dto);
  }

  @Get()
  findAll() {
    return this.criterioEvaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criterioEvaluacionService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateCriterioEvaluacionDto) {
    return this.criterioEvaluacionService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.criterioEvaluacionService.remove(Number(id));
  }
}