// src/ms/SolicitudBeca/entities/solicitud-beca.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { TipoBeca } from '../../TipoBeca/entities/tipo-beca.entity';
import { Evaluacion } from '../../Evaluacion/entities/evaluacion.entity';

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

  @Column()
  estadoId: number;

  @Column({ nullable: true })
  periodoAcademicoId: number; // Nueva columna

  @Column({ nullable: true })
  fechaSolicitud: Date;

  @Column({ nullable: true })
  observaciones: string;

  @Column({ nullable: true })
  fechaResultado: Date;

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.solicitud)
  evaluaciones: Evaluacion[];
}