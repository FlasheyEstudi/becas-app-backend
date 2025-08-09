// src/ms/Evaluacion/entities/evaluacion.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';
import { DetalleEvaluacion } from '../../DetalleEvaluacion/entities/detalle-evaluacion.entity';
import { User } from '../../users/entities/user.entity'; // Cambiado de usuario.entity a user.entity

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.evaluaciones)
  solicitud: SolicitudBeca;

  @Column()
  solicitudId: number;

  @ManyToOne(() => User, (user) => user.evaluaciones)
  evaluador: User;

  @Column()
  evaluadorId: number;

  @Column()
  puntuacionTotal: number;

  @Column({ nullable: true })
  comentarios: string;

  @Column({ nullable: true })
  recomendacion: string; // 'aprobado', 'rechazado', 'pendiente'

  @Column({ nullable: true })
  fechaEvaluacion: Date;

  @OneToMany(() => DetalleEvaluacion, (detalleEvaluacion) => detalleEvaluacion.evaluacion)
  detalleEvaluacion: DetalleEvaluacion[];
}