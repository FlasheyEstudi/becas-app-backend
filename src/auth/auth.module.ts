// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../ms/users/users.module'; // Importar el módulo de usuarios

@Module({
  imports: [
    PassportModule, // Importar PassportModule
    JwtModule.register({
      secret: 'tu_secreto_secreto', // Usar secreto directo
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule, // Importar el módulo de usuarios
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}