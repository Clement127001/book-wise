import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAuthService {
  async getHello(): Promise<string> {
    return 'Hai I am the auth service';
  }
}
