import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';
import { UserAccountStatus } from 'contract/enum';

@Entity()
export class User extends BaseEntity {
  @Property()
  firstname: string;

  @Property()
  lastname: string;

  @Property()
  avatarUrl: string | null;

  @Property()
  @Unique()
  identityCardUrl: string;

  @Property()
  @Unique()
  email: string;

  @Property({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Enum({ items: () => UserAccountStatus, default: UserAccountStatus.PENDING })
  verificationStatus: UserAccountStatus;

  constructor({
    firstname,
    lastname,
    avatarUrl,
    identityCardUrl,
    email,
  }: {
    firstname: string;
    lastname: string;
    avatarUrl: string | null;
    identityCardUrl: string;
    email: string;
  }) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
    this.avatarUrl = avatarUrl;
    this.identityCardUrl = identityCardUrl;
    this.email = email;
    this.isDeleted = false;
    this.verificationStatus = UserAccountStatus.PENDING;
  }
}
