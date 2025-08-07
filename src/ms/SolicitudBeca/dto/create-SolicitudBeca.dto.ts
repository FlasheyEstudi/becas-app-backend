import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateSolicitudBecaDto {
  @IsNotEmpty()
  estudianteId: number;

  @IsNotEmpty()
  tipoBecaId: number;

  @IsNotEmpty()
  estadoId: number;

  @IsNotEmpty()
  @IsDateString()
  fechaSolicitud: string;

  @IsNotEmpty()
  periodoAcademicoId: number;

  @IsNotEmpty()
  observaciones: string;

  @IsDateString()
  fechaResultado?: string;
}
