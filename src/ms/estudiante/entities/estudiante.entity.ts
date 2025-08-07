// src/ms/estudiante/entities/estudiante.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  edad: number;

  @Column({ unique: true })
  correo: string;

  @Column({ nullable: true })
  estadoId: number;

  @Column({ nullable: true })
  carreraId: number;

  // Relación inversa
  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.estudiante)
  solicitudesBeca: SolicitudBeca[];
}