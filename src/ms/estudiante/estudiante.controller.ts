import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('/add')
  create(@Body() dto: CreateEstudianteDto) {
    return this.estudianteService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateEstudianteDto) {
    return this.estudianteService.update(Number(id), dto);
  }

  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(Number(id));
  }
}
