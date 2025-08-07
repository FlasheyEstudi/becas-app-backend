// src/ms/estudiante/estudiante.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
  ) {}

  async create(dto: CreateEstudianteDto): Promise<Estudiante> {
    const estudiante = this.estudianteRepository.create(dto);
    return this.estudianteRepository.save(estudiante);
  }

  findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find();
  }

  async findOne(id: number): Promise<Estudiante | null> {
    return this.estudianteRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateEstudianteDto): Promise<Estudiante> {
    await this.estudianteRepository.update(id, dto);
    const updatedEstudiante = await this.estudianteRepository.findOne({ where: { id } });
    if (!updatedEstudiante) {
      throw new Error(`Estudiante with ID ${id} not found`);
    }
    return updatedEstudiante;
  }

  async remove(id: number): Promise<void> {
    await this.estudianteRepository.delete(id);
  }
}