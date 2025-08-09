// src/ms/TipoBeca/entities/tipo-beca.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CriterioEvaluacion } from '../../CriterioEvaluacion/entities/criterio-evaluacion.entity';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';
import { DetalleRequisitosBeca } from '../../Detalle_requisitos-beca/entities/detalle-requisitos-beca.entity';

@Entity()
export class TipoBeca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => CriterioEvaluacion, (criterioEvaluacion) => criterioEvaluacion.tipoBeca)
  criteriosEvaluacion: CriterioEvaluacion[];

  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.tipoBeca)
  solicitudes: SolicitudBeca[];

  @OneToMany(() => DetalleRequisitosBeca, (detalleRequisitosBeca) => detalleRequisitosBeca.tipoBeca)
  detalleRequisitosBeca: DetalleRequisitosBeca[];
}