import { Account } from '../../auth/entities/account.entity';
import { Entity, OneToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../../base.entity';

@Entity()
export class Admin extends BaseEntity {
  @Unique()
  @OneToOne({ entity: () => Account, primary: true })
  user: Account;

  @Property({type:"boolean",default:false})
  isVerified:boolean;

  constructor({ user }: { user: Account }) {
    super();
    this.user = user;
    this.isVerified=false;
  }
}
