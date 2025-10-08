import { AuthService } from '@/auth/auth.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { SuperadminRequestShape } from './superadmin.controller';

@Injectable()
export class SuperadminService {
  constructor(
    private em: EntityManager,
    private authService: AuthService,
  ) {}

  async generateSuperadminLoginOTP(
    data: SuperadminRequestShape['generateSuperadminLoginOTP']['body'],
  ) {}

  async verifySuperadminLoginOTP(
    data: SuperadminRequestShape['verifySuperadminLoginOTP']['body'],
  ) {}

  async listAdmin(query: SuperadminRequestShape['listAdmin']['query']) {}

  async verifyAdmin(body: SuperadminRequestShape['verifyAdmin']['body']) {}
}
