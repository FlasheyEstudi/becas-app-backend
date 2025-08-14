import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudBecaService } from './SolicitudBeca.service';
import { SolicitudBecaController } from './SolicitudBeca.controller';
import { SolicitudBeca } from './entities/solicitud-beca.entity';
import { EstudianteModule } from '../estudiante/estudiante.module';
import { TipoBecaModule } from '../TipoBeca/TipoBeca.module';
import { EstadoModule } from '../Estado/Estado.module';
import { PeriodoAcademicoModule } from '../PeriodicoAcademico/PeriodoAcademico.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudBeca]),
    EstudianteModule,
    TipoBecaModule,
    EstadoModule,
    PeriodoAcademicoModule,
  ],
  controllers: [SolicitudBecaController],
  providers: [SolicitudBecaService],
})
export class SolicitudBecaModule {}
