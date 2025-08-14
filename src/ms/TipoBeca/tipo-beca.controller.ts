import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TipoBecaService } from './tipo-beca.service';
import { CreateTipoBecaDto } from './dto/create-TipoBeca.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tipos de Beca')
@Controller('tipo-beca')
export class TipoBecaController {
  constructor(private readonly tipoBecaService: TipoBecaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de beca' })
  @ApiResponse({ status: 201, description: 'Tipo de beca creado exitosamente' })
  create(@Body() dto: CreateTipoBecaDto) {
    return this.tipoBecaService.create(dto);
  }

  @Get('count')
  @ApiOperation({ summary: 'Contar tipos de beca disponibles' })
  @ApiResponse({ status: 200, description: 'Conteo de tipos de beca' })
  async count() {
    return this.tipoBecaService.count();
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de beca' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de beca' })
  findAll() {
    return this.tipoBecaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de beca por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de beca encontrado' })
  findOne(@Param('id') id: string) {
    return this.tipoBecaService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un tipo de beca' })
  @ApiResponse({ status: 200, description: 'Tipo de beca actualizado' })
  update(@Param('id') id: string, @Body() dto: CreateTipoBecaDto) {
    return this.tipoBecaService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tipo de beca' })
  @ApiResponse({ status: 204, description: 'Tipo de beca eliminado' })
  remove(@Param('id') id: string) {
    return this.tipoBecaService.remove(+id);
  }
}
