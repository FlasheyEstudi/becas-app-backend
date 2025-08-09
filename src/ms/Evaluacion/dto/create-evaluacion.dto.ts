// src/ms/Evaluacion/dto/create-evaluacion.dto.ts
export class CreateEvaluacionDto {
  solicitudId: number;
  evaluadorId: number;
  puntuacionTotal: number;
  comentarios?: string;
  recomendacion?: string;
}