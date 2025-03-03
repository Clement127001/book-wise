import { EntityManager, QueryOrder, wrap } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Admin } from '@/admin/entities/admin.entity';
import { AdminLoginOTP } from '@/admin-auth/entities/adminLoginOTP.entity';
import { AuthService } from '@/auth/auth.service';
import { AdminAuthRequestShape } from '@/admin-auth/admin-auth.controller';
import { checkOTPExpiration, generateOTP } from '@/utils';

@Injectable()
export class AdminAuthService {
  constructor(
    private em: EntityManager,
    private authService: AuthService,
  ) {}

  async generateAdminLoginOTP(
    data: AdminAuthRequestShape['generateAdminLoginOTP']['body'],
  ) {
    const { email } = data;

    const admin = await this.em.findOne(Admin, {
      email,
    });

    if (!admin) {
      throw new BadRequestException('Admin with given email not found');
    }

    const otp = generateOTP();

    const adminLoginOtp = new AdminLoginOTP({
      email,
      otp,
      admin: this.em.getReference(Admin, admin.id),
    });

    await this.em.persistAndFlush(adminLoginOtp);
  }

  async verifyAdminLoginOTP(
    data: AdminAuthRequestShape['verifyAdminLoginOTP']['body'],
  ) {
    const { email, otp } = data;

    const admin = await this.em.findOne(Admin, {
      email,
    });

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
    this.em.persistAndFlush(otpData);

    const token = await this.authService.generateJWTToken({
      id: admin.id,
      email: admin.email,
    });

    return { token };
  }
}
