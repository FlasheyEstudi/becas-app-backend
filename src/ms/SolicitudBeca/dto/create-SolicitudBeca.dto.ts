import { IsDateString, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateSolicitudBecaDto {
  @IsNotEmpty()
  @IsNumber()
  estudianteId: number;

  @IsNotEmpty()
  @IsNumber()
  tipoBecaId: number;

  @IsNotEmpty()
  @IsNumber()
  estadoId: number;

  @IsNotEmpty()
  @IsDateString()
  fechaSolicitud: string;

  @IsNotEmpty()
  @IsNumber()
  periodoAcademicoId: number;

  @IsNotEmpty()
  @IsString()
  observaciones: string;

  @IsOptional()
  @IsDateString()
  fechaResultado?: string;
}
