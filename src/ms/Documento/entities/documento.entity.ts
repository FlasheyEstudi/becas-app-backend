// src/ms/Documento/entities/documento.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity()
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  url: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.documentos)
  estudiante: Estudiante;

  @Column()
  estudianteId: number;
}