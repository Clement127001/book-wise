import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from '@/auth/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private em: EntityManager,
  ) {}

  async generateJWTToken({ id, email }: { id: string; email: string }) {
    const payload = { id, email };
    return this.jwtService.sign(payload);
  }

  async validateAccount(id: string) {
    const account = await this.em.findOne(Account, { id });
    return account;
  }
}
