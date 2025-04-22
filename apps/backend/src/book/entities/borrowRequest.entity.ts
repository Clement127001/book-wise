import { User } from '@/user/entities/user.entity';
import { Entity, Enum, Index, Property } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';
import { Book } from '@/book/entities/book.entity';
import { BorrowRequestStatusEnum } from 'contract/enum';

@Entity()
export class BorrowRequest extends BaseEntity {
  @Property()
  @Index()
  user: User;

  @Property()
  @Index()
  book: Book;

  @Enum({ items: () => BorrowRequestStatusEnum })
  status: BorrowRequestStatusEnum = BorrowRequestStatusEnum.PENDING;

  @Property()
  borrowReuqestExpiresAt?: Date;

  @Property()
  borrowBookExpiresAt?: Date;

  @Property()
  coolDownExpiresAt?: Date;

  @Property({ default: null })
  reasonForRejection?: String | null;

  constructor({ user, book }: { user: User; book: Book }) {
    super();

    this.user = user;
    this.book = book;
    this.status = BorrowRequestStatusEnum.PENDING;
  }
}
