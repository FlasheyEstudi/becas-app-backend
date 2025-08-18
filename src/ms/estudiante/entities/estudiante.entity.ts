import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Estado } from '../../Estado/entities/estado.entity';
import { Carrera } from '../../Carrera/entities/carrera.entity';
import { User } from '../../users/entities/user.entity';
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

  @Column({ unique: true })
  correo: string;

  @Column({ nullable: true })
  estadoId?: number;

  @Column({ nullable: true })
  carreraId?: number;

  @Column({ nullable: true })
  userId?: number;

  @ManyToOne(() => Estado, { nullable: true })
  @JoinColumn({ name: 'estadoId' })
  estado?: Estado;

  @ManyToOne(() => Carrera, { nullable: true })
  @JoinColumn({ name: 'carreraId' })
  carrera?: Carrera;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToMany(() => Documento, (documento) => documento.estudiante)
  documentos: Documento[];

  @OneToMany(() => SolicitudBeca, (solicitud) => solicitud.estudiante)
  solicitudes: SolicitudBeca[];
}