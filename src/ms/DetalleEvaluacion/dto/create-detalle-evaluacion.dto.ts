// src/ms/DetalleEvaluacion/dto/create-detalle-evaluacion.dto.ts
export class CreateDetalleEvaluacionDto {
  evaluacionId: number;
  criterioId: number;
  puntuacion: number;
  observaciones?: string;
}