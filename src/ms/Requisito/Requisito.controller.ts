// src/ms/Requisito/Requisito.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { RequisitoService } from './Requisito.service';
import { CreateRequisitoDto } from './dto/create-Requisito.dto';
import { UpdateRequisitoDto } from './dto/update-Requisito.dto';

@Controller('Requisito')
export class RequisitoController {
  constructor(private readonly requisitoService: RequisitoService) {}

  @Post('/add')
  create(@Body() dto: CreateRequisitoDto) {
    return this.requisitoService.create(dto);
  }

  @Get()
  findAll() {
    return this.requisitoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.requisitoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRequisitoDto) {
    return this.requisitoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.requisitoService.remove(id);
  }
}