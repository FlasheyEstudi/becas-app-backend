// src/ms/estudiante/estudiante.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './entities/estudiante.entity';
import { UsersModule } from '../users/users.module';  // Importa módulo de usuarios

@Module({
  imports: [
    TypeOrmModule.forFeature([Estudiante]),
    UsersModule, // Importar módulo usuarios para inyección
  ],
  providers: [EstudianteService],
  controllers: [EstudianteController],
})
export class EstudianteModule {}
