// src/ms/CriterioEvaluacion/entities/criterio-evaluacion.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { TipoBeca } from '../../TipoBeca/entities/tipo-beca.entity';
import { DetalleEvaluacion } from '../../DetalleEvaluacion/entities/detalle-evaluacion.entity';

@Entity()
export class CriterioEvaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column()
  peso: number;

  @ManyToOne(() => TipoBeca, (tipoBeca) => tipoBeca.criteriosEvaluacion)
  tipoBeca: TipoBeca;

  @Column({ nullable: true })
  tipoBecaId: number;

  @OneToMany(() => DetalleEvaluacion, (detalleEvaluacion) => detalleEvaluacion.criterio)
  detalleEvaluacion: DetalleEvaluacion[];
}