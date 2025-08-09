// src/ms/Estado/entities/estado.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';

@Entity()
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.estadoId) // Cambiado a estadoId
  solicitudes: SolicitudBeca[];
}