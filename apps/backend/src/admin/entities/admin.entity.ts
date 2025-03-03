import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';

@Entity()
@Unique({ properties: ['email'] })
export class Admin extends BaseEntity {
  @Property()
  firstname: string;

  @Property()
  lastname: string;

  @Property()
  avatarUrl: string | null;

  @Property()
  email: string;

  constructor({
    firstname,
    lastname,
    avatarUrl,
    email,
  }: {
    firstname: string;
    lastname: string;
    avatarUrl: string | null;
    email: string;
  }) {
    super();

    this.firstname = firstname;
    this.lastname = lastname;
    this.avatarUrl = avatarUrl;
    this.email = email;
  }
}
