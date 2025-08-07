// src/ms/PeriodicoAcademico/entities/periodo-academico.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';

@Entity()
export class PeriodoAcademico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  anioAcademico: string;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column({ nullable: true })
  estadoId: number;

  // Relación inversa
  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.periodoAcademico)
  solicitudesBeca: SolicitudBeca[];
}