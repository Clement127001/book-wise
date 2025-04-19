import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWTConstant } from '@/constants';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: JWTConstant.secret,
    });
  }

  async validate(payload: { id: string; email: string }) {
    try {
      const account = await this.authService.validateAccount(payload.id);
      if (!account) throw new UnauthorizedException();
      return account;
    } catch (err) {
      return null;
    }
  }
}
