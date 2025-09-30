import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { EmailVerification } from '@/auth/entities/emailVerification.entity';
import { Account } from '@/auth/entities/account.entity';
import { AuthService } from '@/auth/auth.service';
import { AdminRequestShape } from './admin.controller';
import { UserRoleEnum } from 'contract/enum';

@Injectable()
export class AdminService {
  constructor(
    private em: EntityManager,
    private authService: AuthService,
  ) {}

  async createAdmin(data: AdminRequestShape['createAdmin']['body']) {
    const { email, verficationId, firstname, lastname, avatarUrl } = data;

    const admin = await this.em.findOne(Admin, {
      user: { email },
    });

    if (admin)
      throw new BadRequestException(
        'User with give email is already exists, try to login instead',
      );

    const isEmailVerified = await this.em.findOne(EmailVerification, {
      email,
      id: verficationId,
    });

    if (!isEmailVerified)
      throw new BadRequestException('Email is not verified.');

    const newUserAccount = new Account({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email,
      avatarUrl: avatarUrl || null,
      role: UserRoleEnum.ADMIN,
    });

    const newUser = new Admin({
      user: newUserAccount,
      //   identityCardUrl,
    });

    this.em.persistAndFlush([newUserAccount, newUser]);

    const token = await this.authService.generateJWTToken({
      id: newUserAccount.id,
      email,
    });

    return { token };
  }

  async verifyAdmin(data: AdminRequestShape['verifyAdmin']['body']) {
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
}
