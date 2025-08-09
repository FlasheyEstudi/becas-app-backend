export class CreateEstudianteDto {
  Id?: number;
  nombre: string;
  apellidos: string;
  edad: number;
  correo: string;
  EstadoId?: number;
  carreraId?: number;
}
