import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Requisito } from './entities/requisito.entity';
import { CreateRequisitoDto } from './dto/create-Requisito.dto';
import { UpdateRequisitoDto } from './dto/update-Requisito.dto';

@Injectable()
export class RequisitoService {
  constructor(
    @InjectRepository(Requisito)
    private requisitoRepository: Repository<Requisito>,
  ) {}

  async create(dto: CreateRequisitoDto): Promise<Requisito> {
    const requisito = this.requisitoRepository.create(dto);
    return this.requisitoRepository.save(requisito);
  }

  findAll(): Promise<Requisito[]> {
    return this.requisitoRepository.find();
  }

  async findOne(id: number): Promise<Requisito | null> {
    return this.requisitoRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateRequisitoDto): Promise<Requisito> {
    await this.requisitoRepository.update(id, dto);
    const updatedRequisito = await this.requisitoRepository.findOne({ where: { id } });
    if (!updatedRequisito) {
      throw new Error(`Requisito con ID ${id} no encontrado`);
    }
    return updatedRequisito;
  }

  async remove(id: number): Promise<void> {
    const result = await this.requisitoRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Requisito con ID ${id} no encontrado`);
    }
  }
}