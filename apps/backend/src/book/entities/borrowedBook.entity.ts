import { User } from '@/user/entities/user.entity';
import { Entity, Enum, Index, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';
import { Book } from '@/book/entities/book.entity';
import { BorrowedBookStatusEnum } from 'contract/enum';

@Entity()
export class BorrowedBook extends BaseEntity {
  @ManyToOne(() => User)
  @Index()
  user!: User;

  @ManyToOne(() => Book)
  @Index()
  book!: Book;

  @Property({ default: 0 })
  fineAmount: number;

  @Property()
  expectedReturn?: Date;

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
