import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { EstadoService } from './Estado.service';
import { CreateEstadoDto } from './dto/create-Estado.dto';

@Controller('estado')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Post('/add')
  create(@Body() dto: CreateEstadoDto) {
    return this.estadoService.create(dto);
  }

  @Get()
  findAll() {
    return this.estadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoService.remove(Number(id));
  }
}
