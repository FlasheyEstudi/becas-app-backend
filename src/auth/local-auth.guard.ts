import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { identifier, password } = request.body;
    if (!identifier || !password) return false;

    const user = await this.authService.validateCredentials(identifier, password);
    if (user) {
      request.user = user; // asignar usuario al request
      return true;
    }
    return false;
  }
}
