import { 
  Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, InternalServerErrorException 
} from '@nestjs/common';
import { SolicitudBecaService } from './SolicitudBeca.service';
import { CreateSolicitudBecaDto } from './dto/create-SolicitudBeca.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@ApiTags('Solicitudes de Beca')
@Controller('solicitudes-beca')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SolicitudBecaController {
  constructor(private readonly solicitudBecaService: SolicitudBecaService) {}

  @Post()
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Crear nueva solicitud de beca' })
  @ApiResponse({ status: 201, description: 'Solicitud creada exitosamente' })
  create(@Body() dto: CreateSolicitudBecaDto) {
    try {
      return this.solicitudBecaService.create(dto);
    } catch (err) {
      console.error('Error creando solicitud:', err);
      throw new InternalServerErrorException('Error interno al crear solicitud de beca');
    }
  }

  @Get('count')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Contar solicitudes por estado' })
  @ApiResponse({ status: 200, description: 'Conteo de solicitudes' })
  async countByEstado(@Query('estadoId') estadoId?: string) {
    try {
      const id = estadoId ? parseInt(estadoId, 10) : undefined;
      return this.solicitudBecaService.countByEstado(id);
    } catch (err) {
      console.error('Error en countByEstado:', err);
      throw new InternalServerErrorException('Error interno al contar solicitudes');
    }
  }

  @Get('pendientes')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener solicitudes pendientes' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes pendientes' })
  async findPending(@Query('limit') limit?: string) {
    try {
      // Corrección: Manejar el caso cuando limit es undefined o no es un número válido
      let numericLimit: number | undefined;
      if (limit !== undefined && limit !== '') {
        numericLimit = parseInt(limit, 10);
        if (isNaN(numericLimit) || numericLimit <= 0) {
          numericLimit = undefined; // Si no es un número válido, no limitar
        }
      }
      
      return this.solicitudBecaService.findPending(numericLimit);
    } catch (err) {
      console.error('Error en findPending:', err);
      throw new InternalServerErrorException('Error interno al obtener solicitudes pendientes');
    }
  }

  @Get('tendencia')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener tendencia mensual de solicitudes' })
  @ApiResponse({ status: 200, description: 'Datos de tendencia' })
  async getMonthlyTrend(@Query('months') months?: string) {
    try {
      const numericMonths = months ? parseInt(months, 10) : 6;
      if (isNaN(numericMonths) || numericMonths <= 0) {
        throw new InternalServerErrorException('Número de meses inválido');
      }
      return this.solicitudBecaService.getMonthlyTrend(numericMonths);
    } catch (err) {
      console.error('Error en getMonthlyTrend:', err);
      throw new InternalServerErrorException('Error interno al obtener tendencia mensual');
    }
  }

  @Get('estadisticas/estados')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener conteo de solicitudes por estado' })
  @ApiResponse({ status: 200, description: 'Conteo de solicitudes por estado' })
  async obtenerEstadisticasEstados() {
    try {
      return this.solicitudBecaService.contarPorEstado();
    } catch (err) {
      console.error('Error en obtenerEstadisticasEstados:', err);
      throw new InternalServerErrorException('Error interno al obtener estadísticas por estado');
    }
  }

  @Get()
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener todas las solicitudes' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes' })
  findAll() {
    try {
      return this.solicitudBecaService.findAll();
    } catch (err) {
      console.error('Error en findAll:', err);
      throw new InternalServerErrorException('Error interno al obtener solicitudes');
    }
  }

  @Get('estudiante/:idEstudiante')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener solicitudes de beca por estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes del estudiante' })
  async findByEstudiante(@Param('idEstudiante') idEstudiante: string) {
    try {
      return this.solicitudBecaService.findByEstudiante(+idEstudiante);
    } catch (err) {
      console.error('Error en findByEstudiante:', err);
      throw new InternalServerErrorException('Error interno al obtener solicitudes del estudiante');
    }
  }

  @Get(':id')
  @Roles('admin', 'estudiante')
  @ApiOperation({ summary: 'Obtener una solicitud por ID' })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada' })
  findOne(@Param('id') id: string) {
    try {
      return this.solicitudBecaService.findOne(+id);
    } catch (err) {
      console.error('Error en findOne:', err);
      throw new InternalServerErrorException('Error interno al obtener solicitud por ID');
    }
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar una solicitud' })
  @ApiResponse({ status: 200, description: 'Solicitud actualizada' })
  update(@Param('id') id: string, @Body() dto: CreateSolicitudBecaDto) {
    try {
      return this.solicitudBecaService.update(+id, dto);
    } catch (err) {
      console.error('Error en update:', err);
      throw new InternalServerErrorException('Error interno al actualizar solicitud');
    }
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar una solicitud' })
  @ApiResponse({ status: 204, description: 'Solicitud eliminada' })
  remove(@Param('id') id: string) {
    try {
      return this.solicitudBecaService.remove(+id);
    } catch (err) {
      console.error('Error en remove:', err);
      throw new InternalServerErrorException('Error interno al eliminar solicitud');
    }
  }
}