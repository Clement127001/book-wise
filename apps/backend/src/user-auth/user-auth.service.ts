import { BadRequestException, Injectable } from '@nestjs/common';
import { UserAuthRequestShape } from './user-auth.controller';
import { EntityManager, QueryOrder, wrap } from '@mikro-orm/postgresql';
import { User } from '@/user/entities/user.entity';
import { checkOTPExpiration, generateOTP } from '@/utils';
import { RegisterOTP } from '@/user-auth/entities/registerOTP.entity';
import { EmailVerification } from '@/user-auth/entities/emailVerification.entity';

@Injectable()
export class UserAuthService {
  constructor(private em: EntityManager) {}

  async generateUserEmailVerficationOTP(
    data: UserAuthRequestShape['generateUserEmailVerficationOTP']['body'],
  ) {
    const { email } = data;

    const user = await this.em.findOne(User, { email });

    if (user)
      throw new BadRequestException(
        'User with give email is already exists, try to login instead',
      );

    const otp = generateOTP();
    const userRegisterOTP = new RegisterOTP({ email, otp });

    await this.em.persistAndFlush(userRegisterOTP);
  }

  async verfiyUserEmailVerificationOTP(
    data: UserAuthRequestShape['verfiyUserEmailVerificationOTP']['body'],
  ) {
    const { email, otp } = data;

    const otpData = await this.em.findOne(
      RegisterOTP,
      { email },
      { orderBy: { createdAt: QueryOrder.DESC } },
    );

    if (!otpData || otpData.otp !== otp) {
      throw new BadRequestException('Invalid OTP.');
    }

    if (otpData.isUsed) {
      throw new BadRequestException('OTP has already been used.');
    }

    const isOtpExpired = checkOTPExpiration(otpData.createdAt);

    if (isOtpExpired) throw new BadRequestException('OTP is expired');

    wrap(otpData).assign({ isUsed: true });
    const verification = new EmailVerification({ email });

    this.em.persist([otpData, verification]);
    await this.em.flush();

    return { verificationId: verification.id };
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
