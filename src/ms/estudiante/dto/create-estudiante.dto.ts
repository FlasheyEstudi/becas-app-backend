// src/ms/estudiante/dto/create-estudiante.dto.ts
export class CreateEstudianteDto {
  Id?: number;
  nombre: string;
  apellidos: string;
  edad: number;
  correo: string;
  EstadoId?: number;
  carreraId?: number;
}
