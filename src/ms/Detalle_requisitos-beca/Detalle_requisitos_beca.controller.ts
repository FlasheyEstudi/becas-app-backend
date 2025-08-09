import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { DetalleRequisitosBecaService } from './Detalle_requisitos_beca.service';
import { CreateDetalleRequisitosBecaDto } from './dto/create-Detalle-requisitos_beca.dto';

@Controller('Detalle_requisitos_beca')
export class Detalle_requisitos_becaController {
  constructor(private readonly detalleRequisitosBecaService: DetalleRequisitosBecaService) {}

  @Post('/add')
  create(@Body() dto: CreateDetalleRequisitosBecaDto) {
    return this.detalleRequisitosBecaService.create(dto);
  }

  @Get()
  findAll() {
    return this.detalleRequisitosBecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleRequisitosBecaService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateDetalleRequisitosBecaDto) {
    return this.detalleRequisitosBecaService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleRequisitosBecaService.remove(Number(id));
  }
}