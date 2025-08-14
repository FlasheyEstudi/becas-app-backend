// src/ms/PeriodicoAcademico/entities/periodo-academico.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';

@Entity()
export class PeriodoAcademico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  anioAcademico: string;

  @Column()
  fechainicio: string;

  @Column()
  fechafin: string;

  @Column()
  estadoId: number;

  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.periodoAcademico) // Corregido
  solicitudes: SolicitudBeca[];
}