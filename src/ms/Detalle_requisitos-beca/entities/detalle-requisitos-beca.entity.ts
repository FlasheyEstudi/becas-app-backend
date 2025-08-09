// src/ms/Detalle_requisitos-beca/entities/detalle-requisitos-beca.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TipoBeca } from '../../TipoBeca/entities/tipo-beca.entity';
import { Requisito } from '../../Requisito/entities/requisito.entity';

@Entity()
export class DetalleRequisitosBeca {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @ManyToOne(() => TipoBeca, (tipoBeca) => tipoBeca.detalleRequisitosBeca)
  tipoBeca: TipoBeca;

  @ManyToOne(() => Requisito, (requisito) => requisito.detalleRequisitosBeca)
  requisito: Requisito;
}