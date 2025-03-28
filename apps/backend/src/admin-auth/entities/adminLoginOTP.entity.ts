import { Admin } from '@/admin/entities/admin.entity';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';

@Entity()
export class AdminLoginOTP extends BaseEntity {
  @ManyToOne(() => Admin, { nullable: true })
  admin?: Admin;

  @Property()
  email: string;

  @Property()
  otp: string;

  @Property({ type: 'boolean', default: false })
  isUsed: boolean;

  constructor({
    email,
    otp,
    admin,
  }: {
    email: string;
    otp: string;
    admin?: Admin;
  }) {
    super();

    this.admin = admin;
    this.email = email;
    this.otp = otp;
    this.isUsed = false;
  }
}
