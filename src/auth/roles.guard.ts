// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Si no se especifican roles, el endpoint es libre
    }

    const { user } = context.switchToHttp().getRequest();
    
    // Verifica que el usuario tenga uno de los roles requeridos (case-insensitive)
    return requiredRoles.some(role => 
      user?.role?.toLowerCase() === role.toLowerCase()
    );
  }
}