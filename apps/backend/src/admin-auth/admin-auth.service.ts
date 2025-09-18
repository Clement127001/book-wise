import { EntityManager, QueryOrder, wrap } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Admin } from '@/admin/entities/admin.entity';
import { Account } from '@/auth/entities/account.entity';
import { AdminLoginOTP } from '@/admin-auth/entities/adminLoginOTP.entity';
import { AuthService } from '@/auth/auth.service';
import { AdminAuthRequestShape } from '@/admin-auth/admin-auth.controller';
import { checkOTPExpiration, generateOTP } from '@/utils';
import { UserRoleEnum } from 'contract/enum';
import { EmailVerification } from '@/auth/entities/emailVerification.entity';
import { RegisterOTP } from '@/auth/entities/registerOTP.entity';

@Injectable()
export class AdminAuthService {
  constructor(
    private em: EntityManager,
    private authService: AuthService,
  ) {}

  async generateAdminEmailVerficationOTP(
    data: AdminAuthRequestShape['generateAdminEmailVerficationOTP']['body'],
  ) {
    const { email } = data;

    const user = await this.em.findOne(Admin, {
      user: { email, role: UserRoleEnum.ADMIN },
    });

    if (user)
      throw new BadRequestException(
        'User with give email is already exists, try to login instead',
      );

    const otp = generateOTP();
    const userRegisterOTP = new RegisterOTP({ email, otp });

    await this.em.persistAndFlush(userRegisterOTP);
  }

  async verfiyAdminEmailVerificationOTP(
    data: AdminAuthRequestShape['verfiyAdminEmailVerificationOTP']['body'],
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

  async verifyAdmin(data: AdminAuthRequestShape['verifyAdmin']['body']) {
    const { email } = data;
    const admin = await this.em.findOne(Admin, { user: { email } });

    if (!admin) {
      throw new BadRequestException(
        'Admin with given email is not found. Please register as admin',
      );
    }

    wrap(admin).assign({ isVerified: true });
    await this.em.persistAndFlush(admin);
  }

  async generateAdminLoginOTP(
    data: AdminAuthRequestShape['generateAdminLoginOTP']['body'],
  ) {
    const { email } = data;

    const admin = await this.em.findOne(
      Admin,
      {
        user: { email, role: UserRoleEnum.ADMIN },
      },
      { populate: ['id', 'user.id'] },
    );

    if (!admin) {
      throw new BadRequestException('Admin with given email not found');
    }

    const otp = generateOTP();

    const adminLoginOtp = new AdminLoginOTP({
      email,
      otp,
      admin,
    });

    await this.em.persistAndFlush(adminLoginOtp);
  }

  async verifyAdminLoginOTP(
    data: AdminAuthRequestShape['verifyAdminLoginOTP']['body'],
  ) {
    const { email, otp } = data;

    const admin = await this.em.findOne(
      Admin,
      {
        user: { email, role: UserRoleEnum.ADMIN },
      },
      {
        populate: ['user.id'],
      },
    );

    if (!admin)
      throw new BadRequestException('Admin with given email is not found');

    const otpData = await this.em.findOne(
      AdminLoginOTP,
      { email },
      { orderBy: { createdAt: QueryOrder.DESC } },
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
      id: admin.user.id,
      email,
    });

    return { token };
  }
}
