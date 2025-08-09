import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle_requisitos_becaController} from './Detalle_requisitos_beca.controller';
import { DetalleRequisitosBecaService } from './Detalle_requisitos_beca.service';
import { DetalleRequisitosBeca } from './entities/detalle-requisitos-beca.entity';
import { TipoBeca } from '../TipoBeca/entities/tipo-beca.entity';
import { Requisito } from '../Requisito/entities/requisito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DetalleRequisitosBeca, 
      TipoBeca, 
      Requisito
    ])
  ],
  controllers: [DetalleRequisitosBeca],
  providers: [DetalleRequisitosBecaService],
})
export class DetalleRequisitosBecaModule {}