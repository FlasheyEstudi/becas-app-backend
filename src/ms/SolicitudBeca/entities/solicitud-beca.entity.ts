import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { TipoBeca } from '../../TipoBeca/entities/tipo-beca.entity';
import { Evaluacion } from '../../Evaluacion/entities/evaluacion.entity';
import { Estado } from '../../Estado/entities/estado.entity';
import { PeriodoAcademico } from '../../PeriodicoAcademico/entities/periodo-academico.entity';

@Entity()
export class SolicitudBeca {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.solicitudes)
  estudiante: Estudiante;

  @Column()
  estudianteId: number;

  @ManyToOne(() => TipoBeca, (tipoBeca) => tipoBeca.solicitudes)
  tipoBeca: TipoBeca;

  @Column()
  tipoBecaId: number;

  @ManyToOne(() => Estado, (estado) => estado.solicitudes)
  estado: Estado;

  @Column()
  estadoId: number;

  @ManyToOne(() => PeriodoAcademico, (periodo) => periodo.solicitudes)
  periodoAcademico: PeriodoAcademico;

  @Column()
  periodoAcademicoId: number;

  @Column()
  fechaSolicitud: Date;

  @Column({ nullable: true })
  observaciones: string;

  @Column({ nullable: true })
  fechaResultado: Date;

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.solicitud)
  evaluaciones: Evaluacion[];
}
