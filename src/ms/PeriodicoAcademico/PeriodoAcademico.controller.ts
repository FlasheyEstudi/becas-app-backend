import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { PeriodoAcademicoService } from './PeriodoAcademico.service';
import { CreatePeriodoAcademicoDto } from './dto/create-PeriodoAcademico.dto';

@Controller('periodo-academico') // ✅ ruta en minúsculas
export class PeriodoAcademicoController {
  constructor(private readonly periodoAcademicoService: PeriodoAcademicoService) {}

  @Post('add')
  create(@Body() dto: CreatePeriodoAcademicoDto) {
    return this.periodoAcademicoService.create(dto);
  }

  @Get()
  findAll() {
    return this.periodoAcademicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodoAcademicoService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreatePeriodoAcademicoDto) {
    return this.periodoAcademicoService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodoAcademicoService.remove(Number(id));
  }
}
