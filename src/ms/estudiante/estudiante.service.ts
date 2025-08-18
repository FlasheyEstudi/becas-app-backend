import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Crear estudiante y usuario asociado
   */
  async create(dto: CreateEstudianteDto): Promise<{ estudiante: Estudiante; user: User; password: string }> {
    if (!dto.nombre || !dto.apellidos || !dto.correo) {
      throw new BadRequestException('Nombre, apellidos y correo son requeridos');
    }

    // Validar correo único
    const emailExists = await this.usersService.findOneByEmail(dto.correo);
    if (emailExists) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    // Generar username único
    const username = await this.generateUniqueUsername(dto.nombre, dto.apellidos);
    
    // Generar contraseña temporal
    const password = this.generateTemporaryPassword();

    try {
      // Crear usuario
      const user = await this.usersService.create({
        username,
        nombre: dto.nombre,
        apellidos: dto.apellidos,
        email: dto.correo,
        password,
        role: 'estudiante',
      });

      // Crear estudiante
      const estudiante = new Estudiante();
      estudiante.nombre = dto.nombre;
      estudiante.apellidos = dto.apellidos;
      estudiante.correo = dto.correo;
      estudiante.estadoId = dto.estadoId ?? undefined;
      estudiante.carreraId = dto.carreraId ?? undefined;
      estudiante.userId = user.id;

      const savedEstudiante = await this.estudianteRepository.save(estudiante);

      return {
        estudiante: savedEstudiante,
        user,
        password,
      };
    } catch (error) {
      console.error('Error al crear estudiante:', error);
      throw new BadRequestException('Error al crear estudiante');
    }
  }

  /**
   * Generar username único basado en nombre y apellido
   */
  private async generateUniqueUsername(nombre: string, apellidos: string): Promise<string> {
    const base = nombre.charAt(0).toLowerCase() + apellidos.split(' ')[0].toLowerCase();
    let username = base;
    let counter = 1;
    while (await this.usersService.findOneByUsername(username)) {
      username = `${base}${counter}`;
      counter++;
    }
    return username;
  }

  /**
   * Generar contraseña temporal (fecha actual: DDMMYYYY)
   */
  private generateTemporaryPassword(): string {
    const date = new Date();
    return `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
  }

  /**
   * Obtener todos los estudiantes
   */
  async findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find({
      relations: ['estado', 'carrera', 'user'],
    });
  }

  /**
   * Obtener un estudiante por ID
   */
  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['estado', 'carrera', 'user'],
    });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    return estudiante;
  }

  /**
   * Contar estudiantes
   */
  async count(): Promise<{ count: number }> {
    const count = await this.estudianteRepository.count();
    return { count };
  }

  /**
   * Actualizar estudiante
   */
  async update(id: number, dto: Partial<CreateEstudianteDto>): Promise<Estudiante> {
    const estudiante = await this.findOne(id);
    if (dto.nombre) estudiante.nombre = dto.nombre;
    if (dto.apellidos) estudiante.apellidos = dto.apellidos;
    if (dto.correo) estudiante.correo = dto.correo;
    if (dto.estadoId !== undefined) estudiante.estadoId = dto.estadoId;
    if (dto.carreraId !== undefined) estudiante.carreraId = dto.carreraId;
    return this.estudianteRepository.save(estudiante);
  }

  /**
   * Eliminar estudiante
   */
  async remove(id: number): Promise<void> {
    const estudiante = await this.findOne(id);
    await this.estudianteRepository.remove(estudiante);
  }
}