import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoBeca } from './entities/tipo-beca.entity';
import { CreateTipoBecaDto } from './dto/create-TipoBeca.dto';

@Injectable()
export class TipoBecaService {
  constructor(
    @InjectRepository(TipoBeca)
    private tipoBecaRepository: Repository<TipoBeca>,
  ) {}

  async create(dto: CreateTipoBecaDto): Promise<TipoBeca> {
    const tipoBeca = this.tipoBecaRepository.create(dto);
    return this.tipoBecaRepository.save(tipoBeca);
  }

  async count(): Promise<{ count: number }> {
    const count = await this.tipoBecaRepository.count();
    return { count };
  }

  findAll(): Promise<TipoBeca[]> {
    return this.tipoBecaRepository.find();
  }

  async findOne(id: number): Promise<TipoBeca> {
    const tipoBeca = await this.tipoBecaRepository.findOne({ where: { id } });
    if (!tipoBeca) {
      throw new NotFoundException(`Tipo de beca con ID ${id} no encontrado`);
    }
    return tipoBeca;
  }

  async update(id: number, dto: CreateTipoBecaDto): Promise<TipoBeca> {
    await this.tipoBecaRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tipoBecaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de beca con ID ${id} no encontrado`);
    }
  }
}
