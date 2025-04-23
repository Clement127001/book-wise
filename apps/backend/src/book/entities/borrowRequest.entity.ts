import { User } from '@/user/entities/user.entity';
import { Entity, Enum, Index, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';
import { Book } from '@/book/entities/book.entity';
import { BorrowRequestStatusEnum } from 'contract/enum';

@Entity()
export class BorrowRequest extends BaseEntity {
  @ManyToOne(() => User)
  @Index()
  user!: User;

  @ManyToOne(() => Book)
  @Index()
  book!: Book;

  @Enum({ items: () => BorrowRequestStatusEnum })
  status: BorrowRequestStatusEnum = BorrowRequestStatusEnum.PENDING;

  @Property()
  borrowRequestExpiresAt?: Date;

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
