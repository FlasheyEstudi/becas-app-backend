import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { CriterioEvaluacion } from '../../CriterioEvaluacion/entities/criterio-evaluacion.entity';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';
import { DetalleRequisitosBeca } from '../../DetalleRequisitosBeca/entities/detalle-requisitos-beca.entity';

@Entity()
export class TipoBeca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  monto: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  estadoId: number;

  /* relaciones */
  @OneToMany(() => CriterioEvaluacion, (criterioEvaluacion) => criterioEvaluacion.tipoBeca)
  criteriosEvaluacion: CriterioEvaluacion[];

  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.tipoBeca)
  solicitudes: SolicitudBeca[];

  @OneToMany(() => DetalleRequisitosBeca, (detalleRequisitosBeca) => detalleRequisitosBeca.tipoBeca)
  detalleRequisitosBeca: DetalleRequisitosBeca[];
}
