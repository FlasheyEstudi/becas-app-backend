// solicitud-beca.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudBecaService } from './SolicitudBeca.service';
import { SolicitudBecaController } from './SolicitudBeca.controller';
import { SolicitudBeca } from './entities/solicitud-beca.entity';
import { EstudianteModule } from '../estudiante/estudiante.module'; // Ruta corregida y consistente
import { TipoBecaModule } from '../TipoBeca/TipoBeca.module'; // Ruta ya estaba correcta
import { EstadoModule } from '../Estado/Estado.module'; // Ruta ya estaba correcta
import { PeriodoAcademicoModule } from '../PeriodicoAcademico/PeriodoAcademico.module'; // Ruta ya estaba correcta

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