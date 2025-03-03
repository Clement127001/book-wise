import { Injectable } from '@nestjs/common';
import { UserAuthRequestShape } from './user-auth.controller';

@Injectable()
export class UserAuthService {
  async generateUserEmailVerficationOTP(
    data: UserAuthRequestShape['generateUserEmailVerficationOTP']['body'],
  ) {}

  async verfiyUserEmailVerificationOTP(
    data: UserAuthRequestShape['verfiyUserEmailVerificationOTP']['body'],
  ) {
    //FIXME: dummy verificationId
    return 'hi';
  }

  async generateUserLoginOTP(
    data: UserAuthRequestShape['generateUserLoginOTP']['body'],
  ) {}

  async verifyUserLoginOTP(
    data: UserAuthRequestShape['verifyUserLoginOTP']['body'],
  ) {
    //FIXME: dummy token
    const token = 'hi';

    return { token };
  }
}
