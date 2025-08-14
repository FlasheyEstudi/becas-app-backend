// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../ms/users/users.service';

@Injectable()
export class AuthService {
  constructor( 
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, // Esta debe estar correctamente inyectada
  ) { }

  async validateCredentials(identifier: string, password: string): Promise<any> {
    try {
      console.log('Validando credenciales:', { identifier, password });
      
      const user = await this.usersService.findOneByUsernameOrEmail(identifier);
      console.log('Usuario encontrado:', user ? 'SÍ' : 'NO');
      
      if (!user) {
        console.log('Usuario no encontrado');
        return null;
      }
      
      console.log('Comparando contraseña...');
      const isPasswordValid = await this.usersService.validatePassword(password, user.password);
      console.log('Contraseña válida:', isPasswordValid);
      
      if (!isPasswordValid) {
        console.log('Contraseña incorrecta');
        return null;
      }
      
      const { password: _, ...result } = user;
      console.log('Credenciales válidas, retornando:', result);
      return result;
    } catch (error) {
      console.error('Error en validateCredentials:', error);
      return null;
    }
  }

  async login(credentials: { identifier: string; password: string }) {
    try {
      console.log('Intentando login con:', credentials);
      const user = await this.validateCredentials(credentials.identifier, credentials.password);
      if (!user) {
        console.log('Login fallido - credenciales inválidas');
        throw new Error('Credenciales inválidas');
      }
      
      const payload = {
        email: user.email,
        sub: user.id,
        role: user.role
      };
      
      console.log('Generando token para usuario:', user.email);
      return {
        access_token: this.jwtService.sign(payload),
        role: user.role
      };
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async register(userData: {
    username: string;
    nombre: string;
    apellidos: string | null;
    email: string;
    password: string;
    role?: string;
  }) {
    try {
      if (!userData.username || !userData.nombre || !userData.email || !userData.password) {
        throw new Error('Todos los campos son requeridos');
      }
      
      const existingUser = await this.usersService.findOneByUsernameOrEmail(userData.email);
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }
      
      return await this.usersService.create(userData);
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }
}