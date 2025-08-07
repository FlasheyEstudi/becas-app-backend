// src/ms/Carrera/carrera.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entities/carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private carreraRepository: Repository<Carrera>,
  ) { }

  async create(dto: CreateCarreraDto): Promise<Carrera> {
    const carrera = this.carreraRepository.create(dto);
    return this.carreraRepository.save(carrera);
  }

  findAll(): Promise<Carrera[]> {
    return this.carreraRepository.find();
  }

  async findOne(id: number): Promise<Carrera | null> {
    return this.carreraRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateCarreraDto): Promise<Carrera> {
    await this.carreraRepository.update(id, dto);
    const updatedCarrera = await this.carreraRepository.findOne({ where: { id } });
    if (!updatedCarrera) {
      throw new Error(`Carrera with ID ${id} not found`);
    }
    return updatedCarrera;
  }

  async remove(id: number): Promise<void> {
    await this.carreraRepository.delete(id);
  }
}