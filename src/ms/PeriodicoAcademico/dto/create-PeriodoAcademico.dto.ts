export class CreatePeriodoAcademicoDto {
  Id?: number;
  nombre: string; // Cambiado de "Nombre" a "nombre"
  AnioAcademico: string;
  FechaInicio: string;
  FechaFin: string;
  EstadoId: number;
}
