// src/ms/CriterioEvaluacion/CriterioEvaluacion.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriterioEvaluacion } from './entities/criterio-evaluacion.entity';
import { CreateCriterioEvaluacionDto } from './dto/create-criterio-evaluacion.dto';

@Injectable()
export class CriterioEvaluacionService {
  constructor(
    @InjectRepository(CriterioEvaluacion)
    private criterioEvaluacionRepository: Repository<CriterioEvaluacion>,
  ) {}

  async create(dto: CreateCriterioEvaluacionDto): Promise<CriterioEvaluacion> {
    const criterioEvaluacion = this.criterioEvaluacionRepository.create(dto);
    return this.criterioEvaluacionRepository.save(criterioEvaluacion);
  }

  findAll(): Promise<CriterioEvaluacion[]> {
    return this.criterioEvaluacionRepository.find();
  }

  async findOne(id: number): Promise<CriterioEvaluacion | null> {
    return this.criterioEvaluacionRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateCriterioEvaluacionDto): Promise<CriterioEvaluacion> {
    await this.criterioEvaluacionRepository.update(id, dto);
    const updatedCriterio = await this.criterioEvaluacionRepository.findOne({ where: { id } });
    if (!updatedCriterio) {
      throw new Error(`CriterioEvaluacion with ID ${id} not found`);
    }
    return updatedCriterio;
  }

  async remove(id: number): Promise<void> {
    await this.criterioEvaluacionRepository.delete(id);
  }
}