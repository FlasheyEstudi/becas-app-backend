export class CreateTipoBecaDto {
  Id?: number;
  nombre: string; // Cambiado de "Nombre" a "nombre"
  Descripcion: string;
  Monto: number;
  EstadoId: number;
}
