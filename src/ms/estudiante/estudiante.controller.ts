// src/ms/estudiante/estudiante.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@Controller('estudiantes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateEstudianteDto) {
    return this.estudianteService.create(dto);
  }

  @Get('count')
  @Roles('admin', 'estudiante')
  count() {
    return this.estudianteService.count();
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get('perfil')
  @Roles('estudiante', 'admin')
  getPerfil(@Request() req) {
    return this.estudianteService.findOne(req.user.id);
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: CreateEstudianteDto) {
    return this.estudianteService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
