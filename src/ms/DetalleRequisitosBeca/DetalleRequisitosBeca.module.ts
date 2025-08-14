import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleRequisitosBecaController } from './DetalleRequisitosBeca.controller';
import { DetalleRequisitosBecaService } from './DetalleRequisitosBeca.service';
import { DetalleRequisitosBeca } from './entities/detalle-requisitos-beca.entity';
import { TipoBeca } from '../TipoBeca/entities/tipo-beca.entity';
import { Requisito } from '../Requisito/entities/requisito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DetalleRequisitosBeca,
      TipoBeca,
      Requisito
    ]),
  ],
  controllers: [DetalleRequisitosBecaController],
  providers: [DetalleRequisitosBecaService],
})
export class DetalleRequisitosBecaModule { }
