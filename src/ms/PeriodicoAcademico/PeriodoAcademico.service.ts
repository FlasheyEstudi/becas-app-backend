import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeriodoAcademico } from './entities/periodo-academico.entity';
import { CreatePeriodoAcademicoDto } from './dto/create-PeriodoAcademico.dto';

@Injectable()
export class PeriodoAcademicoService {
  constructor(
    @InjectRepository(PeriodoAcademico)
    private readonly periodoAcademicoRepository: Repository<PeriodoAcademico>,
  ) {}

  async create(dto: CreatePeriodoAcademicoDto): Promise<PeriodoAcademico> {
    const periodoAcademico = this.periodoAcademicoRepository.create(dto);
    return this.periodoAcademicoRepository.save(periodoAcademico);
  }

  findAll(): Promise<PeriodoAcademico[]> {
    return this.periodoAcademicoRepository.find();
  }

  async findOne(id: number): Promise<PeriodoAcademico> {
    const periodo = await this.periodoAcademicoRepository.findOne({ where: { id } });
    if (!periodo) {
      throw new NotFoundException(`PeriodoAcademico con ID ${id} no encontrado`);
    }
    return periodo;
  }

  async update(id: number, dto: CreatePeriodoAcademicoDto): Promise<PeriodoAcademico> {
    await this.periodoAcademicoRepository.update(id, dto);
    return this.findOne(id); // reutiliza findOne para lanzar NotFoundException si no existe
  }

  async remove(id: number): Promise<void> {
    const result = await this.periodoAcademicoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`PeriodoAcademico con ID ${id} no encontrado`);
    }
  }
}
