// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    try {
      const user = await this.authService.validateCredentials(credentials.username, credentials.password);
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      return this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException('Error en la autenticación');
    }
  }
}