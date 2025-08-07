import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { TipoBeca } from '../../TipoBeca/entities/tipo-beca.entity';
import { Estado } from '../../Estado/entities/estado.entity';
import { PeriodoAcademico } from '../../PeriodicoAcademico/entities/periodo-academico.entity';

@Entity()
export class SolicitudBeca {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.solicitudesBeca, { nullable: false })
  @JoinColumn({ name: 'estudianteId' })
  estudiante: Estudiante;

  @ManyToOne(() => TipoBeca, (tipoBeca) => tipoBeca.solicitudesBeca, { nullable: false })
  @JoinColumn({ name: 'tipoBecaId' })
  tipoBeca: TipoBeca;

  @ManyToOne(() => Estado, (estado) => estado.solicitudesBeca, { nullable: false })
  @JoinColumn({ name: 'estadoId' })
  estado: Estado;

  @Column({ name: 'fechaSolicitud' })
  fechaSolicitud: Date;

  @ManyToOne(() => PeriodoAcademico, (periodoAcademico) => periodoAcademico.solicitudesBeca, { nullable: false })
  @JoinColumn({ name: 'periodoAcademicoId' })
  periodoAcademico: PeriodoAcademico;

  @Column({ name: 'observaciones' })
  observaciones: string;

  @Column({ name: 'fechaResultado', nullable: true })
  fechaResultado: Date;
}
