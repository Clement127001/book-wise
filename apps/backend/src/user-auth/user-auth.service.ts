import { BadRequestException, Injectable } from '@nestjs/common';
import { UserAuthRequestShape } from './user-auth.controller';
import { EntityManager, QueryOrder, wrap } from '@mikro-orm/postgresql';
import { User } from '@/user/entities/user.entity';
import { checkOTPExpiration, generateOTP } from '@/utils';
import { RegisterOTP } from '@/user-auth/entities/registerOTP.entity';
import { EmailVerification } from '@/user-auth/entities/emailVerification.entity';
import { UserLoginOTP } from './entities/userLoginOTP.entity';
import { AuthService } from '@/auth/auth.service';
import { UserRoleEnum } from 'contract/enum';

@Injectable()
export class UserAuthService {
  constructor(
    private em: EntityManager,
    private authService: AuthService,
  ) {}

  async generateUserEmailVerficationOTP(
    data: UserAuthRequestShape['generateUserEmailVerficationOTP']['body'],
  ) {
    const { email } = data;

    const user = await this.em.findOne(User, {
      user: { email, role: UserRoleEnum.USER },
    });

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
  ) {
    const { email } = data;

    const user = await this.em.findOne(
      User,
      {
        user: { email },
        isDeleted: false,
      },
      { populate: ['id'] },
    );

    if (!user)
      throw new BadRequestException(
        `User with given mail isn't exist.Please register an account.`,
      );

    const otp = generateOTP();

    const loginOTP = new UserLoginOTP({
      email: email,
      otp: otp,
      user,
    });

    await this.em.persistAndFlush(loginOTP);
  }

  async verifyUserLoginOTP(
    data: UserAuthRequestShape['verifyUserLoginOTP']['body'],
  ) {
    const { email, otp } = data;

    const userData = await this.em.findOne(
      User,
      {
        user: { email },
        isDeleted: false,
      },
      { populate: ['user.id'] },
    );

    if (!userData)
      throw new BadRequestException(
        `User with given mail isn't exist.Please register an account.`,
      );

    const otpData = await this.em.findOne(
      UserLoginOTP,
      { email },
      { orderBy: { createdAt: QueryOrder.desc } },
    );

    if (!otpData || otpData.otp !== otp)
      throw new BadRequestException('Invalid OTP');

    if (otpData.isUsed)
      throw new BadRequestException('OTP has been used already');

    const isOtpExpired = checkOTPExpiration(otpData.createdAt);

    if (isOtpExpired) throw new BadRequestException('OTP is expired');

    wrap(otpData).assign({ isUsed: true });
    await this.em.persistAndFlush(otpData);

    const token = await this.authService.generateJWTToken({
      id: userData.user.id,
      email,
    });

    return { token };
  }
}
