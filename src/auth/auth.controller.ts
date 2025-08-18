import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login usando LocalAuthGuard
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    console.log('Procesando login en controller');
    try {
      const result = await this.authService.login({
        identifier: req.body.identifier,
        password: req.body.password,
      });
      console.log('Login exitoso:', result);
      return result;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  // Registro de usuario
  @Post('register')
  async register(@Body() userData: {
    username: string;
    nombre: string;
    apellidos: string | null;
    email: string;
    password: string;
    role?: string;
  }) {
    return this.authService.register(userData);
  }

  // Perfil del usuario (devuelve info desde el token o DB)
  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.id);
  }

  // Cambio de contraseña
  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Request() req,
    @Body() data: { currentPassword: string; newPassword: string }
  ) {
    return this.authService.changePassword(
      req.user.id,
      data.currentPassword,
      data.newPassword
    );
  }
}