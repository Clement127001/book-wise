import { Genre } from '@/genre/entities/genre.entity';
import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';

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

  @Property({ default: 0 })
  rating: number;

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
  }
}
