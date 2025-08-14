import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTipoBecaDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @Min(0)
  monto: number;

  @IsNumber()
  @Min(1)
  estadoId: number;
}
