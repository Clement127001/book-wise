import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminAuthService {
  async getHello(): Promise<string> {
    return 'Hi I am admin auth service';
  }
}
