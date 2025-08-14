import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateEstudianteDto): Promise<Estudiante> {
    // Validación mejorada
    if (!dto.nombre || !dto.apellidos || !dto.correo) {
      throw new BadRequestException('Los campos nombre, apellidos y correo son requeridos');
    }

    try {
      // Crear estudiante
      const estudiante = this.estudianteRepository.create(dto);
      const savedEstudiante = await this.estudianteRepository.save(estudiante);

      console.log('Estudiante creado:', savedEstudiante);

      // Generar username base: primera letra nombre + primer apellido, todo en minúsculas
      const nombre = dto.nombre.trim();
      const apellidos = dto.apellidos.trim();
      const primerApellido = apellidos.split(' ')[0];
      const usernameBase = (nombre[0] + primerApellido).toLowerCase();

      // Generar username único
      const username = await this.generarUsernameUnico(usernameBase);

      // Generar password basado en fecha actual
      const fecha = new Date();
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getFullYear();
      const password = `${dia}${mes}${anio}`; // Ej: 15012025

      console.log('Datos para crear usuario:', {
        username,
        nombre: dto.nombre,
        apellidos: dto.apellidos,
        email: dto.correo,
        password, // ← Esta es la contraseña que se va a usar
        role: 'estudiante'
      });

      // Crear usuario con rol estudiante
      const user = await this.usersService.create({
        username,
        nombre: dto.nombre,
        apellidos: dto.apellidos,
        email: dto.correo,
        password, // ← Aquí se pasa la contraseña correcta
        role: 'estudiante',
      });

      console.log('Usuario creado:', user);

      return savedEstudiante;
    } catch (error) {
      console.error('Error al crear estudiante:', error);
      throw new Error('Error al crear estudiante');
    }
  }

  // Método para asegurar username único
  private async generarUsernameUnico(baseUsername: string): Promise<string> {
    let username = baseUsername;
    let i = 1;
    while (await this.usersService.findOneByUsername(username)) {
      username = `${baseUsername}${i}`;
      i++;
    }
    return username;
  }

  async count(): Promise<{ count: number }> {
    const count = await this.estudianteRepository.count();
    return { count };
  }

  async findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find();
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({ where: { id } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  async update(id: number, dto: CreateEstudianteDto): Promise<Estudiante> {
    await this.estudianteRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.estudianteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
  }
}
