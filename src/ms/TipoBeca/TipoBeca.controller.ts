// src/ms/TipoBeca/TipoBeca.controller.ts
import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TipoBecaService } from './TipoBeca.service';
import { CreateTipoBecaDto } from './dto/create-TipoBeca.dto';

@Controller('TipoBeca')
export class TipoBecaController {
  constructor(private readonly tipoBecaService: TipoBecaService) {}

  @Post('/add')
  create(@Body() dto: CreateTipoBecaDto) {
    return this.tipoBecaService.create(dto);
  }

  @Get()
  findAll() {
    return this.tipoBecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tipoBecaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tipoBecaService.remove(id);
  }
}