// src/ms/Estado/entities/estado.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';

@Entity()
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  fechaRegistro: Date;

  // Relación inversa
  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.estado)
  solicitudesBeca: SolicitudBeca[];
}