import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Post('/add')
  create(@Body() dto: CreateCarreraDto) {
    return this.carreraService.create(dto);
  }

  @Get()
  findAll() {
    return this.carreraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carreraService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateCarreraDto) {
    return this.carreraService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carreraService.remove(Number(id));
  }
}
