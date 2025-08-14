import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleRequisitosBeca } from './entities/detalle-requisitos-beca.entity';
import { CreateDetalleRequisitosBecaDto } from './dto/create-Detalle-requisitos_beca.dto';
import { TipoBeca } from '../TipoBeca/entities/tipo-beca.entity';
import { Requisito } from '../Requisito/entities/requisito.entity';

@Injectable()
export class DetalleRequisitosBecaService {
  constructor(
    @InjectRepository(DetalleRequisitosBeca)
    private readonly detalleRequisitosBecaRepository: Repository<DetalleRequisitosBeca>,
    @InjectRepository(TipoBeca)
    private readonly tipoBecaRepository: Repository<TipoBeca>,
    @InjectRepository(Requisito)
    private readonly requisitoRepository: Repository<Requisito>,
  ) { }

  async create(createDto: CreateDetalleRequisitosBecaDto): Promise<DetalleRequisitosBeca> {
    const tipoBeca = await this.tipoBecaRepository.findOne({
      where: { id: createDto.tipoBecaId },
    });
    const requisito = await this.requisitoRepository.findOne({
      where: { id: createDto.requisitoId },
    });

    if (!tipoBeca || !requisito) {
      throw new NotFoundException('TipoBeca o Requisito no encontrado');
    }

    const nuevoDetalle = this.detalleRequisitosBecaRepository.create({
      tipoBeca,
      requisito,
    });

    return await this.detalleRequisitosBecaRepository.save(nuevoDetalle);
  }

  async findAll(): Promise<DetalleRequisitosBeca[]> {
    return this.detalleRequisitosBecaRepository.find({
      relations: ['tipoBeca', 'requisito'],
    });
  }

  async findOne(id: number): Promise<DetalleRequisitosBeca> {
    const detalle = await this.detalleRequisitosBecaRepository.findOne({
      where: { id_detalle: id },
      relations: ['tipoBeca', 'requisito'],
    });

    if (!detalle) {
      throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
    }

    return detalle;
  }

  async update(id: number, updateDto: CreateDetalleRequisitosBecaDto): Promise<DetalleRequisitosBeca> {
    const detalle = await this.detalleRequisitosBecaRepository.findOne({
      where: { id_detalle: id },
    });

    if (!detalle) {
      throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
    }

    const tipoBeca = await this.tipoBecaRepository.findOne({
      where: { id: updateDto.tipoBecaId },
    });
    const requisito = await this.requisitoRepository.findOne({
      where: { id: updateDto.requisitoId },
    });

    if (!tipoBeca || !requisito) {
      throw new NotFoundException('TipoBeca o Requisito no encontrado');
    }

    detalle.tipoBeca = tipoBeca;
    detalle.requisito = requisito;

    return this.detalleRequisitosBecaRepository.save(detalle);
  }

  async remove(id: number): Promise<void> {
    const result = await this.detalleRequisitosBecaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Detalle con ID ${id} no encontrado`);
    }
  }
}
