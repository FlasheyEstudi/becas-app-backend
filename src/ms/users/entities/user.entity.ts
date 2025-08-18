import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Auditoria } from '../../Auditoria/entities/auditoria.entity';
import { Evaluacion } from '../../Evaluacion/entities/evaluacion.entity';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  apellidos: string | null;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'estudiante' })
  role: string;

  @OneToMany(() => Auditoria, (auditoria) => auditoria.usuario)
  auditorias?: Auditoria[];

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.evaluador)
  evaluaciones?: Evaluacion[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.user)
  estudiantes?: Estudiante[];
}