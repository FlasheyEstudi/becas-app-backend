// src/ms/AreaConocimiento/AreaConocimiento.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaConocimiento } from './entities/area-conocimiento.entity';
import { CreateAreaConocimientoDto } from './dto/create-AreaConocimiento.dto';

@Injectable()
export class AreaConocimientoService {
  constructor(
    @InjectRepository(AreaConocimiento)
    private areaConocimientoRepository: Repository<AreaConocimiento>,
  ) {}

  async create(dto: CreateAreaConocimientoDto): Promise<AreaConocimiento> {
    const areaConocimiento = this.areaConocimientoRepository.create(dto);
    return this.areaConocimientoRepository.save(areaConocimiento);
  }

  findAll(): Promise<AreaConocimiento[]> {
    return this.areaConocimientoRepository.find();
  }

  async findOne(id: number): Promise<AreaConocimiento | null> {
    return this.areaConocimientoRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateAreaConocimientoDto): Promise<AreaConocimiento> {
    await this.areaConocimientoRepository.update(id, dto);
    const updatedArea = await this.areaConocimientoRepository.findOne({ where: { id } });
    if (!updatedArea) {
      throw new Error(`AreaConocimiento with ID ${id} not found`);
    }
    return updatedArea;
  }

  async remove(id: number): Promise<void> {
    await this.areaConocimientoRepository.delete(id);
  }
}