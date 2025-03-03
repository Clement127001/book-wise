import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJWTToken({ id, email }: { id: string; email: string }) {
    const payload = { id, email };
    return this.jwtService.sign(payload);
  }
}
