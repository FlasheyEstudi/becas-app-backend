import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'tu_secreto_secreto', // Usar secreto directo
    });
  }

  async validate(payload: any) {
    // Asegurar que el rol esté en minúsculas
    return { 
      id: payload.sub, 
      username: payload.username, 
      role: payload.role.toLowerCase() // ✅ Forzar minúsculas
    };
  }
}