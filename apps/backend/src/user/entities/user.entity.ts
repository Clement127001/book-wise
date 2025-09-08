import { Account } from '../../auth/entities/account.entity';
import { BorrowedBook } from '../../book/entities/borrowedBook.entity';
import { BorrowRequest } from '../../book/entities/borrowRequest.entity';
import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  OneToOne,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../base.entity';
import { UserAccountStatus } from 'contract/enum';

@Entity()
export class User extends BaseEntity {
  @Unique()
  @OneToOne({ entity: () => Account, primary: true })
  user: Account;

  @Property()
  @Unique()
  identityCardUrl: string;

  @Property({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Enum({ items: () => UserAccountStatus, default: UserAccountStatus.PENDING })
  verificationStatus: UserAccountStatus;

  @OneToMany(() => BorrowRequest, (request) => request.user)
  borrowRequests = new Collection<BorrowRequest>(this);

  @OneToMany(() => BorrowedBook, (request) => request.user)
  borrowedBooks = new Collection<BorrowedBook>(this);

  constructor({
    user,
    identityCardUrl,
  }: {
    user: Account;
    identityCardUrl: string;
  }) {
    super();
    (this.user = user), (this.identityCardUrl = identityCardUrl);
    this.isDeleted = false;
    this.verificationStatus = UserAccountStatus.PENDING;
  }
}
