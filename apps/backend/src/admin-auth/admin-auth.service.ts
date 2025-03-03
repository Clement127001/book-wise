import { EntityManager, QueryOrder, wrap } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Admin } from '@/admin/entities/admin.entity';
import { AdminLoginOTP } from '@/admin-auth/entities/adminLoginOTP.entity';
import * as otpGenerator from 'otp-generator';
import { AuthService } from '@/auth/auth.service';
import { AdminAuthRequestShape } from '@/admin-auth/admin-auth.controller';

@Injectable()
export class AdminAuthService {
  constructor(
    private em: EntityManager,
    private jwtService: AuthService,
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

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const adminLoginOtp = new AdminLoginOTP({
      email,
      otp,
      admin: this.em.getReference(Admin, admin.id),
    });

    this.em.persistAndFlush(adminLoginOtp);
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

    const tenMinutes = 10 * 60 * 1000;
    const isOtpExpired =
      new Date().getTime() - new Date(otpData.createdAt).getTime() > tenMinutes;

    if (isOtpExpired) throw new BadRequestException('OTP is expired');

    wrap(otpData).assign({ isUsed: true });
    this.em.persistAndFlush(otpData);

    const token = await this.jwtService.generateJWTToken({
      id: admin.id,
      email: admin.email,
    });

    return { token };
  }
}
