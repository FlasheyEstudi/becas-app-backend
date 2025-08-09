// src/ms/TipoBeca/TipoBeca.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoBeca } from './entities/tipo-beca.entity';
import { CreateTipoBecaDto } from './dto/create-TipoBeca.dto';

@Injectable()
export class TipoBecaService {
  constructor(
    @InjectRepository(TipoBeca)
    private readonly tipoBecaRepository: Repository<TipoBeca>,
  ) {}

  async create(dto: CreateTipoBecaDto): Promise<TipoBeca> {
    const tipoBeca = this.tipoBecaRepository.create(dto);
    return this.tipoBecaRepository.save(tipoBeca);
  }

  findAll(): Promise<TipoBeca[]> {
    return this.tipoBecaRepository.find();
  }

  async findOne(id: number): Promise<TipoBeca | null> {
    return this.tipoBecaRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateTipoBecaDto): Promise<TipoBeca> {
    await this.tipoBecaRepository.update(id, dto);
    const updatedTipoBeca = await this.tipoBecaRepository.findOne({ where: { id } });
    if (!updatedTipoBeca) {
      throw new Error(`Tipo de beca con ID ${id} no encontrado`);
    }
    return updatedTipoBeca;
  }

  async remove(id: number): Promise<void> {
    const result = await this.tipoBecaRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Tipo de beca con ID ${id} no encontrado`);
    }
  }
}