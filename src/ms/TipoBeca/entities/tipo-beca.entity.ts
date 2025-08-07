// src/ms/TipoBeca/entities/tipo-beca.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';

@Entity()
export class TipoBeca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  monto: number;

  @Column({ nullable: true })
  estadoId: number;

  // Relación inversa
  @OneToMany(() => SolicitudBeca, (solicitudBeca) => solicitudBeca.tipoBeca)
  solicitudesBeca: SolicitudBeca[];
}