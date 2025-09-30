import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
      if (!account?.admin?.isVerified) {
        throw new BadRequestException('Account is not verified.');
      }
      return account;
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw new BadRequestException(err);
      }
      return null;
    }
  }
}
