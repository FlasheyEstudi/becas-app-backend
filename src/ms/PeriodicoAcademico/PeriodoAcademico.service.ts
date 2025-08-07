// src/ms/PeriodicoAcademico/PeriodoAcademico.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeriodoAcademico } from './entities/periodo-academico.entity';
import { CreatePeriodoAcademicoDto } from './dto/create-PeriodoAcademico.dto';

@Injectable()
export class PeriodoAcademicoService {
  constructor(
    @InjectRepository(PeriodoAcademico)
    private periodoAcademicoRepository: Repository<PeriodoAcademico>,
  ) {}

  async create(dto: CreatePeriodoAcademicoDto): Promise<PeriodoAcademico> {
    const periodoAcademico = this.periodoAcademicoRepository.create(dto);
    return this.periodoAcademicoRepository.save(periodoAcademico);
  }

  findAll(): Promise<PeriodoAcademico[]> {
    return this.periodoAcademicoRepository.find();
  }

  async findOne(id: number): Promise<PeriodoAcademico | null> {
    return this.periodoAcademicoRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreatePeriodoAcademicoDto): Promise<PeriodoAcademico> {
    await this.periodoAcademicoRepository.update(id, dto);
    const updatedPeriodo = await this.periodoAcademicoRepository.findOne({ where: { id } });
    if (!updatedPeriodo) {
      throw new Error(`PeriodoAcademico with ID ${id} not found`);
    }
    return updatedPeriodo;
  }

  async remove(id: number): Promise<void> {
    await this.periodoAcademicoRepository.delete(id);
  }
}