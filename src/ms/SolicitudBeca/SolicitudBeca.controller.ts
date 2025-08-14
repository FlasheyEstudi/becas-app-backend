import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { SolicitudBecaService } from './SolicitudBeca.service';
import { CreateSolicitudBecaDto } from './dto/create-SolicitudBeca.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'; // si usas guardas
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@ApiTags('Solicitudes de Beca')
@Controller('solicitudes-beca')
@UseGuards(JwtAuthGuard, RolesGuard) // aplica guardas si es necesario
export class SolicitudBecaController {
  constructor(private readonly solicitudBecaService: SolicitudBecaService) {}

  @Post()
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Crear nueva solicitud de beca' })
  @ApiResponse({ status: 201, description: 'Solicitud creada exitosamente' })
  create(@Body() dto: CreateSolicitudBecaDto) {
    return this.solicitudBecaService.create(dto);
  }

  @Get('count')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Contar solicitudes por estado' })
  @ApiResponse({ status: 200, description: 'Conteo de solicitudes' })
  async countByEstado(@Query('estadoId') estadoId?: number) {
    return this.solicitudBecaService.countByEstado(estadoId);
  }

  @Get('pendientes')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener solicitudes pendientes' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes pendientes' })
  async findPending(@Query('limit') limit?: number) {
    return this.solicitudBecaService.findPending(limit ? +limit : undefined);
  }

  @Get('tendencia')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener tendencia mensual de solicitudes' })
  @ApiResponse({ status: 200, description: 'Datos de tendencia' })
  async getMonthlyTrend(@Query('months') months?: number) {
    return this.solicitudBecaService.getMonthlyTrend(months ? +months : 6);
  }

  @Get('estadisticas/estados')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener conteo de solicitudes por estado' })
  @ApiResponse({ status: 200, description: 'Conteo de solicitudes por estado' })
  async obtenerEstadisticasEstados() {
    return this.solicitudBecaService.contarPorEstado();
  }

  @Get()
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener todas las solicitudes' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes' })
  findAll() {
    return this.solicitudBecaService.findAll();
  }

  @Get('estudiante/:idEstudiante')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener solicitudes de beca por estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes del estudiante' })
  async findByEstudiante(@Param('idEstudiante') idEstudiante: string) {
    return this.solicitudBecaService.findByEstudiante(+idEstudiante);
  }

  @Get(':id')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener una solicitud por ID' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada' })
  findOne(@Param('id') id: string) {
    return this.solicitudBecaService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar una solicitud' })
  @ApiResponse({ status: 200, description: 'Solicitud actualizada' })
  update(@Param('id') id: string, @Body() dto: CreateSolicitudBecaDto) {
    return this.solicitudBecaService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar una solicitud' })
  @ApiResponse({ status: 204, description: 'Solicitud eliminada' })
  remove(@Param('id') id: string) {
    return this.solicitudBecaService.remove(+id);
  }
}
