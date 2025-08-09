// src/ms/Auditoria/entities/auditoria.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tablaAfectada: string;

  @Column()
  accion: string; // 'INSERT', 'UPDATE', 'DELETE'

  @Column()
  registroId: number;

  @ManyToOne(() => User, (user) => user.auditorias)
  usuario: User;

  @Column()
  usuarioId: number;

  @Column({ nullable: true })
  fecha: Date;

  @Column({ nullable: true })
  detalles: string;
}