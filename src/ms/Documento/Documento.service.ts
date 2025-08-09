// src/ms/Documento/Documento.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from './entities/documento.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';

@Injectable()
export class DocumentoService {
  constructor(
    @InjectRepository(Documento)
    private documentoRepository: Repository<Documento>,
  ) {}

  async create(dto: CreateDocumentoDto): Promise<Documento> {
    const documento = this.documentoRepository.create(dto);
    return this.documentoRepository.save(documento);
  }

  findAll(): Promise<Documento[]> {
    return this.documentoRepository.find();
  }

  async findOne(id: number): Promise<Documento | null> {
    return this.documentoRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateDocumentoDto): Promise<Documento> {
    await this.documentoRepository.update(id, dto);
    const updatedDocumento = await this.documentoRepository.findOne({ where: { id } });
    if (!updatedDocumento) {
      throw new Error(`Documento with ID ${id} not found`);
    }
    return updatedDocumento;
  }

  async remove(id: number): Promise<void> {
    await this.documentoRepository.delete(id);
  }
}