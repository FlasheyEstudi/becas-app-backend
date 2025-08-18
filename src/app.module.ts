// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './ms/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteModule } from './ms/estudiante/estudiante.module';
import { AreaConocimientoModule } from './ms/AreaConocimiento/AreaConocimiento.module';
import { DetalleRequisitosBecaModule } from './ms/DetalleRequisitosBeca/DetalleRequisitosBeca.module'; // CORRECTO
import { CarreraModule } from './ms/Carrera/carrera.module';
import { RequisitoModule } from './ms/Requisito/Requisito.module';
import { TipoBecaModule } from './ms/TipoBeca/TipoBeca.module';
import { PeriodoAcademicoModule } from './ms/PeriodicoAcademico/PeriodoAcademico.module';
import { SolicitudBecaModule } from './ms/SolicitudBeca/SolicitudBeca.module';
import { EstadoModule } from './ms/Estado/Estado.module';
import { DocumentoModule } from './ms/Documento/Documento.module';
import { EvaluacionModule } from './ms/Evaluacion/Evaluacion.module';
import { CriterioEvaluacionModule } from './ms/CriterioEvaluacion/CriterioEvaluacion.module';
import { DetalleEvaluacionModule } from './ms/DetalleEvaluacion/DetalleEvaluacion.module';
//import { NotificacionModule } from './ms/Notificacion/notificacion.module';
import { AuditoriaModule } from './ms/Auditoria/Auditoria.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    UsersModule,
    EstudianteModule,
    AreaConocimientoModule,
    CarreraModule,
    RequisitoModule,
    TipoBecaModule,
    PeriodoAcademicoModule,
    SolicitudBecaModule,
    EstadoModule,
    DetalleRequisitosBecaModule, // Asegúrate que está aquí y no comentado
    DocumentoModule,
    EvaluacionModule,
    CriterioEvaluacionModule,
    DetalleEvaluacionModule,
    //NotificacionModule,
    AuditoriaModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
