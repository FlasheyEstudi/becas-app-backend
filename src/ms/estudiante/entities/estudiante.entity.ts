// src/ms/Estudiante/entities/estudiante.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Documento } from '../../Documento/entities/documento.entity';
import { SolicitudBeca } from '../../SolicitudBeca/entities/solicitud-beca.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column()
  correo: string;

  @Column()
  estadoId: number;

  @Column()
  carreraId: number;

  @OneToMany(() => Documento, (documento) => documento.estudiante)
  documentos: Documento[];

  @OneToMany(() => SolicitudBeca, (solicitud) => solicitud.estudiante)
  solicitudes: SolicitudBeca[];
}