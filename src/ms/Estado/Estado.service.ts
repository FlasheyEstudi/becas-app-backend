// src/ms/Estado/Estado.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { CreateEstadoDto } from './dto/create-Estado.dto';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado)
    private estadoRepository: Repository<Estado>,
  ) {}

  async create(dto: CreateEstadoDto): Promise<Estado> {
    const estado = this.estadoRepository.create(dto);
    return this.estadoRepository.save(estado);
  }

  findAll(): Promise<Estado[]> {
    return this.estadoRepository.find();
  }

  async findOne(id: number): Promise<Estado | null> {
    return this.estadoRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateEstadoDto): Promise<Estado> {
    await this.estadoRepository.update(id, dto);
    const updatedEstado = await this.estadoRepository.findOne({ where: { id } });
    if (!updatedEstado) {
      throw new Error(`Estado with ID ${id} not found`);
    }
    return updatedEstado;
  }

  async remove(id: number): Promise<void> {
    await this.estadoRepository.delete(id);
  }
}