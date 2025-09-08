import { Genre } from '../../genre/entities/genre.entity';
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../base.entity';
import { BorrowRequest } from '../../book/entities/borrowRequest.entity';
import { BorrowedBook } from '../../book/entities/borrowedBook.entity';

@Unique({ properties: ['author', 'title'] })
@Entity()
export class Book extends BaseEntity {
  @Property()
  title: string;

  @Property()
  author: string;

  @Property()
  summary: string;

  @Property()
  total: number;

  @Property()
  available: number;

  @Property()
  imageUrl: string;

  @ManyToOne(() => Genre)
  genre: Genre;

  @OneToMany(() => BorrowRequest, (request) => request.book)
  borrowRequests = new Collection<BorrowRequest>(this);

  @OneToMany(() => BorrowedBook, (request) => request.book)
  borrowedBooks = new Collection<BorrowedBook>(this);

  @Property({ default: 0 })
  rating: number;

  @Property({ default: false })
  isDeleted: boolean;

  constructor({
    title,
    author,
    summary,
    total,
    imageUrl,
    genre,
  }: {
    title: string;
    author: string;
    summary: string;
    total: number;
    imageUrl: string;
    genre: Genre;
  }) {
    super();

    this.title = title;
    this.author = author;
    this.genre = genre;
    this.summary = summary;
    this.total = total;
    this.available = total;
    this.imageUrl = imageUrl;
    this.rating = 0;
    this.isDeleted = false;
  }
}
