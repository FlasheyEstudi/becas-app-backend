import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'identifier',
      passwordField: 'password', // asegurar que se reciba password
    });
  }

  async validate(identifier: string, password: string) {
    const user = await this.authService.validateCredentials(identifier, password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return user;
  }
}
