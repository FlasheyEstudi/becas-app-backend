// src/ms/AreaConocimiento/entities/area-conocimiento.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AreaConocimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;
}
