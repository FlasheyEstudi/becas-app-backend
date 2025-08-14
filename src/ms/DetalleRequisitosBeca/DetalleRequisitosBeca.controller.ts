import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { DetalleRequisitosBecaService } from './DetalleRequisitosBeca.service';
import { CreateDetalleRequisitosBecaDto } from './dto/create-Detalle-requisitos_beca.dto';

@Controller('detalle-requisitos-beca')  // nombre ruta en minúsculas y con guion bajo
export class DetalleRequisitosBecaController {
  constructor(private readonly detalleRequisitosBecaService: DetalleRequisitosBecaService) { }

  @Post('add')
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
