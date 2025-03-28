import { Account } from '@/common/entities/account.entity';
import { Entity, OneToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';

@Entity()
export class Admin extends BaseEntity {
  @Unique()
  @OneToOne({ entity: () => Account, primary: true })
  user: Account;
}
