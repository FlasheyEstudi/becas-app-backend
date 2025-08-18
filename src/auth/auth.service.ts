import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../ms/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // Validación de credenciales - Corregido
  async validateCredentials(identifier: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsernameOrEmail(identifier);
    if (!user) {
      console.log('Usuario no encontrado:', identifier);
      return null;
    }
    
    console.log('Usuario encontrado:', user);
    console.log('Validando contraseña...');
    
    const isPasswordValid = await this.usersService.validatePassword(password, user.password);
    console.log('Resultado de validación:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta para usuario:', user.username);
      return null;
    }
    
    // Asegurar que el rol sea convertido a minúsculas para consistencia
    const { password: _, role, ...result } = user;
    console.log('Usuario validado:', { ...result, role: role.toLowerCase() });
    return { ...result, role: role.toLowerCase() };
  }

  // Login - Corregido
  async login(credentials: { identifier: string; password: string }) {
    console.log('Intentando login con:', credentials);
    
    const user = await this.validateCredentials(credentials.identifier, credentials.password);
    if (!user) {
      console.log('Credenciales inválidas');
      throw new UnauthorizedException('Credenciales inválidas');
    }

    console.log('Usuario autenticado:', user);
    
    // Asegurar que el rol se pase en minúsculas
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role.toLowerCase() // ✅ Forzar minúsculas
    };
    
    const token = this.jwtService.sign(payload);
    console.log('Token generado:', token);
    
    return { 
      access_token: token, 
      role: user.role.toLowerCase() // ✅ Devolver rol en minúsculas
    };
  }

  // Registro - Corregido
  async register(userData: {
    username: string;
    nombre: string;
    apellidos: string | null;
    email: string;
    password: string;
    role?: string;
  }) {
    // Asegurar consistencia en el rol durante el registro
    const userDataWithRole = {
      ...userData,
      role: userData.role ? userData.role.toLowerCase() : 'estudiante' // ✅ Forzar minúsculas
    };
    return this.usersService.create(userDataWithRole);
  }

  // Obtener perfil
  async getProfile(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    const { password, ...result } = user;
    return { ...result, role: result.role.toLowerCase() }; // ✅ Forzar minúsculas
  }

  // Cambiar contraseña
  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isCurrentValid = await this.usersService.validatePassword(currentPassword, user.password);
    if (!isCurrentValid) throw new BadRequestException('Contraseña actual incorrecta');

    await this.usersService.updatePassword(userId, newPassword);
    return { message: 'Contraseña cambiada correctamente' };
  }
}