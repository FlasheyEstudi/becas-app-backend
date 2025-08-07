// src/ms/Detalle_requisitos-beca/Detalle_requisitos_beca.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleRequisitosBeca } from './entities/detalle-requisitos-beca.entity';
import { CreateDetalleRequisitosBecaDto } from './dto/create-Detalle-requisitos_beca.dto';

@Injectable()
export class Detalle_requisitos_becaService {
  constructor(
    @InjectRepository(DetalleRequisitosBeca)
    private detalleRequisitosBecaRepository: Repository<DetalleRequisitosBeca>,
  ) {}

  async create(dto: CreateDetalleRequisitosBecaDto): Promise<DetalleRequisitosBeca> {
    const detalleRequisitosBeca = this.detalleRequisitosBecaRepository.create(dto);
    return this.detalleRequisitosBecaRepository.save(detalleRequisitosBeca);
  }

  findAll(): Promise<DetalleRequisitosBeca[]> {
    return this.detalleRequisitosBecaRepository.find();
  }

  async findOne(id: number): Promise<DetalleRequisitosBeca | null> {
    return this.detalleRequisitosBecaRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateDetalleRequisitosBecaDto): Promise<DetalleRequisitosBeca> {
    await this.detalleRequisitosBecaRepository.update(id, dto);
    const updatedDetalle = await this.detalleRequisitosBecaRepository.findOne({ where: { id } });
    if (!updatedDetalle) {
      throw new Error(`DetalleRequisitosBeca with ID ${id} not found`);
    }
    return updatedDetalle;
  }

  async remove(id: number): Promise<void> {
    await this.detalleRequisitosBecaRepository.delete(id);
  }
}