import { User } from '@/user/entities/user.entity';
import { Entity, Enum, Index, Property } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';
import { Book } from '@/book/entities/book.entity';
import { BorrowedBookStatusEnum } from 'contract/enum';

@Entity()
export class BorrowedBook extends BaseEntity {
  @Property()
  @Index()
  user: User;

  @Property()
  @Index()
  book: Book;

  @Property({ default: 0 })
  fineAmount: number;

  @Property()
  exptectedReturn?: Date;

  @Property()
  actualReturn?: Date;

  @Enum({ items: () => BorrowedBookStatusEnum })
  status: BorrowedBookStatusEnum = BorrowedBookStatusEnum.BORROWED;

  constructor({ user, book }: { user: User; book: Book }) {
    super();
    this.user = user;
    this.book = book;
    this.status = BorrowedBookStatusEnum.BORROWED;
  }
}
