import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UserRequestShape } from '@/user/user.controller';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private em: EntityManager,
    private authService: AuthService,
  ) {}

  async createUser(data: UserRequestShape['createUser']['body']) {
    //FIXME: dummy token
    const token = 'hi';

    return { token };
  }
}
