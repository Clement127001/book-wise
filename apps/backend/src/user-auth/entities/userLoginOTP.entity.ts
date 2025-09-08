import { User } from '../../user/entities/user.entity';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../base.entity';

@Entity()
export class UserLoginOTP extends BaseEntity {
  @ManyToOne()
  user: User;

  @Property()
  email: string;

  @Property()
  otp: string;

  @Property({ type: 'boolean', default: false })
  isUsed: boolean;

  constructor({
    email,
    otp,
    user,
  }: {
    email: string;
    otp: string;
    user: User;
  }) {
    super();
    this.user = user;
    this.email = email;
    this.otp = otp;
    this.isUsed = false;
  }
}
