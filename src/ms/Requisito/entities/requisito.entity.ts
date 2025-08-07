// src/ms/Requisito/entities/requisito.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Requisito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Descripcion: string;

  @Column()
  estadoId: number;
  
  // Si necesitas el nombre del estado, puedes agregarlo como campo calculado
  // pero no como columna en la base de datos necesariamente
  estadoNombre?: string;
}