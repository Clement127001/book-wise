import { Admin } from '@/admin/entities/admin.entity';
import { User } from '@/user/entities/user.entity';
import { Entity, Enum, OneToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';
import { UserRoleEnum } from 'contract/enum';

@Entity()
export class Account extends BaseEntity {
  @Property()
  firstname: string;

  @Property()
  lastname: string;

  @Property()
  @Unique()
  email: string;

  @Property()
  avatarUrl: string | null;

  @Enum({ items: () => UserRoleEnum })
  role: UserRoleEnum;

  @OneToOne('User', (e: User) => e.user, { nullable: true })
  user: User | null;

  @OneToOne('Admin', (e: Admin) => e.user, { nullable: true })
  admin: Admin | null;

  constructor({
    firstname,
    lastname,
    email,
    role,
    avatarUrl,
  }: {
    firstname: string;
    lastname: string;
    email: string;
    role: UserRoleEnum;
    avatarUrl: string | null;
  }) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
    this.avatarUrl = avatarUrl;
  }
}
