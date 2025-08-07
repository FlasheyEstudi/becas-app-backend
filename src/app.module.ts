// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './ms/users/users.module'; // Correcto // Corregido
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteModule } from './ms/estudiante/estudiante.module';
import { AreaConocimientoModule } from './ms/AreaConocimiento/AreaConocimiento.module';
import { CarreraModule } from './ms/Carrera/carrera.module'; // Corregido: mayúscula y ruta correcta
import { RequisitoModule } from './ms/Requisito/Requisito.module';
import { TipoBecaModule } from './ms/TipoBeca/TipoBeca.module';
import { PeriodoAcademicoModule } from './ms/PeriodicoAcademico/PeriodoAcademico.module';
import { SolicitudBecaModule } from './ms/SolicitudBeca/SolicitudBeca.module';
import { EstadoModule } from './ms/Estado/Estado.module';
import { Detalle_requisitos_becaModule } from './ms/Detalle_requisitos-beca/Detalle_requisitos_beca.module';

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
    UsersModule, // Corregido
    EstudianteModule,
    AreaConocimientoModule,
    CarreraModule, // Corregido
    RequisitoModule,
    TipoBecaModule,
    PeriodoAcademicoModule,
    SolicitudBecaModule,
    EstadoModule,
    Detalle_requisitos_becaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}