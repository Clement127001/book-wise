import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';
import { UserAccountStatus } from 'contract/enum';

@Entity()
@Unique({ properties: ['email', 'identityCardUrl'] })
export class User extends BaseEntity {
  @Property()
  firstname: string;

  @Property()
  lastname: string;

  @Property()
  avatarUrl: string | null;

  @Property()
  identityCardUrl: string;

  @Property()
  email: string;

  @Property({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Enum({ items: () => UserAccountStatus, default: UserAccountStatus.PENDING })
  isVerified: UserAccountStatus;

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
  }
}
