// src/ms/Requisito/entities/requisito.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DetalleRequisitosBeca } from '../../DetalleRequisitosBeca/entities/detalle-requisitos-beca.entity';

@Entity()
export class Requisito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  estadoId: number;

  @OneToMany(() => DetalleRequisitosBeca, (detalleRequisitosBeca) => detalleRequisitosBeca.requisito)
  detalleRequisitosBeca: DetalleRequisitosBeca[];
}