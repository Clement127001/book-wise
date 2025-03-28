import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTConstant } from '@/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // Todo: Refresh token and then make it false
      secretOrKey: JWTConstant.secret,
    });
  }

  async validate(payload: { id: string; email: string }) {
    return { userId: payload.id, email: payload.email };
  }
}
