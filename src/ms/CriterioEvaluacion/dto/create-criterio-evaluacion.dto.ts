// src/ms/CriterioEvaluacion/dto/create-criterio-evaluacion.dto.ts
export class CreateCriterioEvaluacionDto {
  nombre: string;
  descripcion?: string;
  peso: number;
  tipoBecaId?: number;
}