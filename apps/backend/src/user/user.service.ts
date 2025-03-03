import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRequestShape } from '@/user/user.controller';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/user/entities/user.entity';
import { EmailVerification } from '@/user-auth/entities/emailVerification.entity';

@Injectable()
export class UserService {
  constructor(
    private em: EntityManager,
    private authService: AuthService,
  ) {}

  async createUser(data: UserRequestShape['createUser']['body']) {
    const {
      email,
      verficationId,
      firstname,
      lastname,
      identityCardUrl,
      avatarUrl,
    } = data;

    const user = await this.em.findOne(User, { email });

    if (user)
      throw new BadRequestException(
        'User with give email is already exists, try to login instead',
      );

    const isEmailVerified = await this.em.findOne(EmailVerification, {
      email,
      id: verficationId,
    });

    if (!isEmailVerified)
      throw new BadRequestException('Email is not verified.');

    const newUser = new User({
      email,
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      avatarUrl: avatarUrl || null,
      identityCardUrl,
    });

    await this.em.persistAndFlush(newUser);

    const token = await this.authService.generateJWTToken({
      id: newUser.id,
      email: newUser.email,
    });

    return { token };
  }
}
