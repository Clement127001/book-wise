import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJWTAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, account: any) {
    if (err || !account) return null;

    return account;
  }
}
