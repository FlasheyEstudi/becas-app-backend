// src/ms/Evaluacion/Evaluacion.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private evaluacionRepository: Repository<Evaluacion>,
  ) {}

  async create(dto: CreateEvaluacionDto): Promise<Evaluacion> {
    const evaluacion = this.evaluacionRepository.create(dto);
    return this.evaluacionRepository.save(evaluacion);
  }

  findAll(): Promise<Evaluacion[]> {
    return this.evaluacionRepository.find();
  }

  async findOne(id: number): Promise<Evaluacion | null> {
    return this.evaluacionRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateEvaluacionDto): Promise<Evaluacion> {
    await this.evaluacionRepository.update(id, dto);
    const updatedEvaluacion = await this.evaluacionRepository.findOne({ where: { id } });
    if (!updatedEvaluacion) {
      throw new Error(`Evaluacion with ID ${id} not found`);
    }
    return updatedEvaluacion;
  }

  async remove(id: number): Promise<void> {
    await this.evaluacionRepository.delete(id);
  }
}