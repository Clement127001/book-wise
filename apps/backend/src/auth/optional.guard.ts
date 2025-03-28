import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJWTAuthGuard extends AuthGuard('jwt') {
  handleRequest(_err: any, account: any) {
    return account ? account : null;
  }
}
