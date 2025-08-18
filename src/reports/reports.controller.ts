// src/ms/reports/reports.controller.ts
import { Controller, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reportes')
@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /**
   * Obtiene estadísticas generales del programa de becas
   * @returns Estadísticas clave del sistema
   */
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Estadísticas obtenidas correctamente' })
  @ApiResponse({ status: 500, description: 'Error al obtener estadísticas' })
  async getStats() {
    try {
      return await this.reportsService.getStats();
    } catch (error) {
      throw new Error(`Error en getStats: ${error.message}`);
    }
  }

  /**
   * Obtiene datos financieros por periodo
   * @returns Información financiera detallada
   */
  @Get('financial')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Datos financieros obtenidos correctamente' })
  @ApiResponse({ status: 500, description: 'Error al obtener datos financieros' })
  async getFinancialData() {
    try {
      return await this.reportsService.getFinancialData();
    } catch (error) {
      throw new Error(`Error en getFinancialData: ${error.message}`);
    }
  }

  /**
   * Obtiene datos de impacto por carrera
   * @returns Análisis de impacto por área académica
   */
  @Get('impact')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Datos de impacto obtenidos correctamente' })
  @ApiResponse({ status: 500, description: 'Error al obtener datos de impacto' })
  async getImpactData() {
    try {
      return await this.reportsService.getImpactData();
    } catch (error) {
      throw new Error(`Error en getImpactData: ${error.message}`);
    }
  }

  /**
   * Obtiene información detallada de estudiantes
   * @returns Lista de estudiantes con sus datos de beca
   */
  @Get('students')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Datos de estudiantes obtenidos correctamente' })
  @ApiResponse({ status: 500, description: 'Error al obtener datos de estudiantes' })
  async getStudentData() {
    try {
      return await this.reportsService.getStudentData();
    } catch (error) {
      throw new Error(`Error en getStudentData: ${error.message}`);
    }
  }
}