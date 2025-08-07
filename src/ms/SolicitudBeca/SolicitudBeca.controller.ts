// src/ms/SolicitudBeca/SolicitudBeca.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { SolicitudBecaService } from './SolicitudBeca.service';
import { CreateSolicitudBecaDto } from './dto/create-SolicitudBeca.dto';

@Controller('SolicitudBeca')
export class SolicitudBecaController {
  constructor(private readonly solicitudBecaService: SolicitudBecaService) {}

  @Post('/add')
  create(@Body() dto: CreateSolicitudBecaDto) {
    return this.solicitudBecaService.create(dto);
  }

  @Get()
  findAll() {
    return this.solicitudBecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudBecaService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateSolicitudBecaDto) {
    return this.solicitudBecaService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudBecaService.remove(Number(id));
  }
}