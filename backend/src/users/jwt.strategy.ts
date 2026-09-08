import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'AgriTouristSuperSecretKey2026', // This MUST match the secret from your users.module.ts
    });
  }

  // If the token is valid, this function extracts the user data so your endpoints can use it
  async validate(payload: any) {
    return { 
      id: payload.sub,
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}