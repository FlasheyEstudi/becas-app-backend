import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { SolicitudBeca } from './entities/solicitud-beca.entity';
import { CreateSolicitudBecaDto } from './dto/create-SolicitudBeca.dto';

@Injectable()
export class SolicitudBecaService {
  constructor(
    @InjectRepository(SolicitudBeca)
    private solicitudBecaRepository: Repository<SolicitudBeca>,
  ) {}

  async create(dto: CreateSolicitudBecaDto): Promise<SolicitudBeca> {
    const solicitudBeca = this.solicitudBecaRepository.create({
      estudiante: { id: dto.estudianteId },
      tipoBeca: { id: dto.tipoBecaId },
      estado: { id: dto.estadoId },
      periodoAcademico: { id: dto.periodoAcademicoId },
      fechaSolicitud: dto.fechaSolicitud ? new Date(dto.fechaSolicitud) : undefined,
      observaciones: dto.observaciones || undefined,
      fechaResultado: dto.fechaResultado ? new Date(dto.fechaResultado) : undefined,
    });

    return this.solicitudBecaRepository.save(solicitudBeca);
  }

  async countByEstado(estadoId?: number): Promise<{ count: number }> {
    const where: any = estadoId ? { estado: { id: estadoId } } : {};
    const count = await this.solicitudBecaRepository.count({ where });
    return { count };
  }

  async findPending(limit?: number): Promise<SolicitudBeca[]> {
    const options: {
      where: { estado: { id: number } };
      relations: string[];
      order: { fechaSolicitud: 'DESC' };
      take?: number;
    } = {
      where: { estado: { id: 1 } }, // 1 = Pendiente
      relations: ['estudiante', 'tipoBeca'],
      order: { fechaSolicitud: 'DESC' },
    };

    if (limit) {
      options.take = limit;
    }

    return this.solicitudBecaRepository.find(options);
  }

  async getMonthlyTrend(months: number): Promise<{ data: number[] }> {
    const data: number[] = [];
    const currentDate = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);

      const count = await this.solicitudBecaRepository.count({
        where: {
          fechaSolicitud: Between(startDate, endDate),
        },
      });

      data.push(count);
    }

    return { data };
  }

  async findAll(): Promise<SolicitudBeca[]> {
    return this.solicitudBecaRepository.find({
      relations: ['estudiante', 'tipoBeca', 'estado', 'periodoAcademico', 'evaluaciones'],
    });
  }

  async findOne(id: number): Promise<SolicitudBeca> {
    const solicitud = await this.solicitudBecaRepository.findOne({
      where: { id },
      relations: ['estudiante', 'tipoBeca', 'estado', 'periodoAcademico', 'evaluaciones'],
    });

    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }

    return solicitud;
  }

  async update(id: number, dto: CreateSolicitudBecaDto): Promise<SolicitudBeca> {
    await this.solicitudBecaRepository.update(id, {
      estudiante: { id: dto.estudianteId },
      tipoBeca: { id: dto.tipoBecaId },
      estado: { id: dto.estadoId },
      periodoAcademico: { id: dto.periodoAcademicoId },
      fechaSolicitud: dto.fechaSolicitud ? new Date(dto.fechaSolicitud) : undefined,
      observaciones: dto.observaciones || undefined,
      fechaResultado: dto.fechaResultado ? new Date(dto.fechaResultado) : undefined,
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.solicitudBecaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }
  }

  // Nuevo método para obtener solicitudes por estudiante
  async findByEstudiante(idEstudiante: number): Promise<SolicitudBeca[]> {
    return this.solicitudBecaRepository.find({
      where: { estudiante: { id: idEstudiante } },
      relations: ['tipoBeca', 'estado', 'periodoAcademico', 'evaluaciones'],
      order: { fechaSolicitud: 'DESC' },
    });
  }

  // Método optimizado para contar solicitudes por estado
  async contarPorEstado(): Promise<{ data: number[] }> {
    const estadosIds = [2, 1, 3, 4]; // Ajusta los IDs según tus estados reales

    const result = await this.solicitudBecaRepository
      .createQueryBuilder('solicitud')
      .select('solicitud.estadoId', 'estadoId')
      .addSelect('COUNT(solicitud.id)', 'count')
      .where('solicitud.estadoId IN (:...estados)', { estados: estadosIds })
      .groupBy('solicitud.estadoId')
      .getRawMany();

    const countsMap = new Map<number, number>();
    result.forEach(row => {
      countsMap.set(Number(row.estadoId), Number(row.count));
    });

    const countsOrdered = estadosIds.map(id => countsMap.get(id) || 0);

    return { data: countsOrdered };
  }
}
