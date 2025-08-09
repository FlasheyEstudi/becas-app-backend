// src/ms/SolicitudBeca/SolicitudBeca.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudBeca } from './entities/solicitud-beca.entity';
import { CreateSolicitudBecaDto } from './dto/create-SolicitudBeca.dto';

@Injectable()
export class SolicitudBecaService {
  constructor(
    @InjectRepository(SolicitudBeca)
    private readonly solicitudBecaRepository: Repository<SolicitudBeca>,
  ) {}

  async create(dto: CreateSolicitudBecaDto): Promise<SolicitudBeca> {
    const solicitudBeca = this.solicitudBecaRepository.create({
      estudianteId: dto.estudianteId,
      tipoBecaId: dto.tipoBecaId,
      estadoId: dto.estadoId,
      periodoAcademicoId: dto.periodoAcademicoId,
      fechaSolicitud: new Date(dto.fechaSolicitud),
      observaciones: dto.observaciones,
      fechaResultado: dto.fechaResultado ? new Date(dto.fechaResultado) : undefined,
    });

    return this.solicitudBecaRepository.save(solicitudBeca);
  }

  async findAll(): Promise<SolicitudBeca[]> {
    return this.solicitudBecaRepository.find({
      relations: ['estudiante', 'tipoBeca', 'estado', 'periodoAcademico'],
    });
  }

  async findOne(id: number): Promise<SolicitudBeca | null> {
    return this.solicitudBecaRepository.findOneBy({ id });
  }

  async update(id: number, dto: CreateSolicitudBecaDto): Promise<SolicitudBeca> {
    await this.solicitudBecaRepository.update(id, {
      estudianteId: dto.estudianteId,
      tipoBecaId: dto.tipoBecaId,
      estadoId: dto.estadoId,
      periodoAcademicoId: dto.periodoAcademicoId,
      fechaSolicitud: new Date(dto.fechaSolicitud),
      observaciones: dto.observaciones,
      fechaResultado: dto.fechaResultado ? new Date(dto.fechaResultado) : undefined,
    });

    const updated = await this.solicitudBecaRepository.findOneBy({ id });
    if (!updated) {
      throw new Error(`SolicitudBeca with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.solicitudBecaRepository.delete(id);
  }
}