import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../base.entity';

@Entity()
export class EmailVerification extends BaseEntity {
  @Property()
  email: string;

  constructor({ email }: { email: string }) {
    super();
    this.email = email;
  }
}
