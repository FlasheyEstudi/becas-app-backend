  import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, BadRequestException } from '@nestjs/common';
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
    async create(@Body() dto: CreateEstudianteDto) {
      const result = await this.estudianteService.create(dto);
      return {
        message: 'Estudiante creado exitosamente',
        estudiante: result.estudiante,
        credenciales: {
          username: result.user.username,
          correo: result.user.email,
          password: result.password
        }
      };
    }

    @Get()
    @Roles('admin')
    async findAll() {
      return this.estudianteService.findAll();
    }

    @Get(':id')
    @Roles('admin')
    async findOne(@Param('id') id: string) {
      const numericId = Number(id);
      if (isNaN(numericId)) throw new BadRequestException(`ID inválido: ${id}`);
      return this.estudianteService.findOne(numericId);
    }

    @Get('count')
    @Roles('admin')
    async count() {
      return this.estudianteService.count();
    }

    @Put(':id')
    @Roles('admin')
    async update(@Param('id') id: string, @Body() dto: Partial<CreateEstudianteDto>) {
      const numericId = Number(id);
      if (isNaN(numericId)) throw new BadRequestException(`ID inválido: ${id}`);
      return this.estudianteService.update(numericId, dto);
    }

    @Delete(':id')
    @Roles('admin')
    async remove(@Param('id') id: string) {
      const numericId = Number(id);
      if (isNaN(numericId)) throw new BadRequestException(`ID inválido: ${id}`);
      await this.estudianteService.remove(numericId);
      return { message: `Estudiante con ID ${id} ha sido eliminado` };
    }
  }