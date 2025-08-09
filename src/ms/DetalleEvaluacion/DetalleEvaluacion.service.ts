// src/ms/DetalleEvaluacion/DetalleEvaluacion.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleEvaluacion } from './entities/detalle-evaluacion.entity';
import { CreateDetalleEvaluacionDto } from './dto/create-detalle-evaluacion.dto';

@Injectable()
export class DetalleEvaluacionService {
  constructor(
    @InjectRepository(DetalleEvaluacion)
    private detalleEvaluacionRepository: Repository<DetalleEvaluacion>,
  ) {}

  async create(dto: CreateDetalleEvaluacionDto): Promise<DetalleEvaluacion> {
    const detalleEvaluacion = this.detalleEvaluacionRepository.create(dto);
    return this.detalleEvaluacionRepository.save(detalleEvaluacion);
  }

  findAll(): Promise<DetalleEvaluacion[]> {
    return this.detalleEvaluacionRepository.find();
  }

  async findOne(id: number): Promise<DetalleEvaluacion | null> {
    return this.detalleEvaluacionRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateDetalleEvaluacionDto): Promise<DetalleEvaluacion> {
    await this.detalleEvaluacionRepository.update(id, dto);
    const updatedDetalle = await this.detalleEvaluacionRepository.findOne({ where: { id } });
    if (!updatedDetalle) {
      throw new Error(`DetalleEvaluacion with ID ${id} not found`);
    }
    return updatedDetalle;
  }

  async remove(id: number): Promise<void> {
    await this.detalleEvaluacionRepository.delete(id);
  }
}