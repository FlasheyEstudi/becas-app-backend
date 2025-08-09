// src/ms/DetalleEvaluacion/entities/detalle-evaluacion.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Evaluacion } from '../../Evaluacion/entities/evaluacion.entity';
import { CriterioEvaluacion } from '../../CriterioEvaluacion/entities/criterio-evaluacion.entity';

@Entity()
export class DetalleEvaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.detalleEvaluacion)
  evaluacion: Evaluacion;

  @Column()
  evaluacionId: number;

  @ManyToOne(() => CriterioEvaluacion, (criterio) => criterio.detalleEvaluacion)
  criterio: CriterioEvaluacion;

  @Column()
  criterioId: number;

  @Column()
  puntuacion: number;

  @Column({ nullable: true })
  comentarios: string;
}