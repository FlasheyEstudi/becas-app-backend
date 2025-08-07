import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { SolicitudBeca } from './entities/solicitud-beca.entity';
import { CreateSolicitudBecaDto } from './dto/create-SolicitudBeca.dto';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { TipoBeca } from '../TipoBeca/entities/tipo-beca.entity';
import { Estado } from '../Estado/entities/estado.entity';
import { PeriodoAcademico } from '../PeriodicoAcademico/entities/periodo-academico.entity';

@Injectable()
export class SolicitudBecaService {
  constructor(
    @InjectRepository(SolicitudBeca)
    private readonly solicitudBecaRepository: Repository<SolicitudBeca>,
  ) {}

  async create(dto: CreateSolicitudBecaDto): Promise<SolicitudBeca> {
    const solicitudBeca: DeepPartial<SolicitudBeca> = {
      estudiante: { id: dto.estudianteId } as Estudiante,
      tipoBeca: { id: dto.tipoBecaId } as TipoBeca,
      estado: { id: dto.estadoId } as Estado,
      fechaSolicitud: new Date(dto.fechaSolicitud),
      periodoAcademico: { id: dto.periodoAcademicoId } as PeriodoAcademico,
      observaciones: dto.observaciones,
      fechaResultado: dto.fechaResultado ? new Date(dto.fechaResultado) : undefined,
    };

    return this.solicitudBecaRepository.save(
      this.solicitudBecaRepository.create(solicitudBeca)
    );
  }

  async findAll(): Promise<SolicitudBeca[]> {
    return this.solicitudBecaRepository.find({
      relations: ['estudiante', 'tipoBeca', 'estado', 'periodoAcademico'],
    });
  }

  async findOne(id: number): Promise<SolicitudBeca | null> {
    return this.solicitudBecaRepository.findOne({
      where: { id },
      relations: ['estudiante', 'tipoBeca', 'estado', 'periodoAcademico'],
    });
  }

  async update(id: number, dto: CreateSolicitudBecaDto): Promise<SolicitudBeca> {
    const solicitud: DeepPartial<SolicitudBeca> = {
      estudiante: { id: dto.estudianteId } as Estudiante,
      tipoBeca: { id: dto.tipoBecaId } as TipoBeca,
      estado: { id: dto.estadoId } as Estado,
      fechaSolicitud: new Date(dto.fechaSolicitud),
      periodoAcademico: { id: dto.periodoAcademicoId } as PeriodoAcademico,
      observaciones: dto.observaciones,
      fechaResultado: dto.fechaResultado ? new Date(dto.fechaResultado) : undefined,
    };

    await this.solicitudBecaRepository.update(id, solicitud);

    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`SolicitudBeca with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.solicitudBecaRepository.delete(id);
  }
}
