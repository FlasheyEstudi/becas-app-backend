// src/ms/Estado/entities/estado.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';

@Entity()
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) // Added fechaRegistro with default value
  fechaRegistro: string; // ISO string or Date type

  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.estado)
  solicitudes: SolicitudBeca[];
}