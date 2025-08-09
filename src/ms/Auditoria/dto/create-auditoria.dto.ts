// src/ms/Auditoria/dto/create-auditoria.dto.ts
export class CreateAuditoriaDto {
  tablaAfectada: string;
  accion: string;
  registroId: number;
  usuarioId: number;
  detalles?: string;
}