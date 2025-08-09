// src/ms/users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Auditoria } from '../../Auditoria/entities/auditoria.entity';
//import { Notificacion } from '../../Notificacion/entities/notificacion.entity';
import { Evaluacion } from '../../Evaluacion/entities/evaluacion.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Auditoria, (auditoria) => auditoria.usuario)
  auditorias: Auditoria[];

  //@OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  //notificaciones: Notificacion[];

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.evaluador)
  evaluaciones: Evaluacion[];
}