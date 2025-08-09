// src/ms/Auditoria/Auditoria.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditoria } from './entities/auditoria.entity';
import { CreateAuditoriaDto } from './dto/create-auditoria.dto';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(Auditoria)
    private auditoriaRepository: Repository<Auditoria>,
  ) {}

  async create(dto: CreateAuditoriaDto): Promise<Auditoria> {
    const auditoria = this.auditoriaRepository.create(dto);
    return this.auditoriaRepository.save(auditoria);
  }

  findAll(): Promise<Auditoria[]> {
    return this.auditoriaRepository.find();
  }

  async findOne(id: number): Promise<Auditoria | null> {
    return this.auditoriaRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateAuditoriaDto): Promise<Auditoria> {
    await this.auditoriaRepository.update(id, dto);
    const updatedAuditoria = await this.auditoriaRepository.findOne({ where: { id } });
    if (!updatedAuditoria) {
      throw new Error(`Auditoria with ID ${id} not found`);
    }
    return updatedAuditoria;
  }

  async remove(id: number): Promise<void> {
    await this.auditoriaRepository.delete(id);
  }
}