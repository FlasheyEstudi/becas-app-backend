// src/ms/Detalle_requisitos-beca/entities/detalle-requisitos-beca.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DetalleRequisitosBeca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  TipoBecaId: number;    // Cambiado de 'tipoBecaId' a 'TipoBecaId'

  @Column()
  RequisitoId: number;   // Cambiado de 'requisitoId' a 'RequisitoId'
}