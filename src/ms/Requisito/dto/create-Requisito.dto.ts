import { IsNotEmpty } from 'class-validator';

export class CreateRequisitoDto {
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  estadoId: number;
}