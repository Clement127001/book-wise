import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAuthService {
  getHello(): string {
    return 'Hai I am the auth service';
  }
}
