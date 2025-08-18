// src/ms/estudiante/dto/create-estudiante.dto.ts
export class CreateEstudianteDto {
  nombre: string;
  apellidos: string;
  correo: string;
  estadoId?: number;
  carreraId?: number;
  rol?: string; // Cambiado de 'role' a 'rol' para mantener consistencia
}