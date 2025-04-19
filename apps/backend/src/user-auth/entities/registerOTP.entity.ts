import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';

@Entity()
export class RegisterOTP extends BaseEntity {
  @Property()
  email: string;

  @Property()
  otp: string;

  @Property({ type: 'boolean', default: false })
  isUsed: boolean;

  constructor({ email, otp }: { email: string; otp: string }) {
    super();
    this.email = email;
    this.otp = otp;
    this.isUsed = false;
  }
}
