import { BadRequestException, Injectable } from '@nestjs/common';
import { BookRequestShape } from '@/book/book.controller';
import { Book } from '@/book/entities/book.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { Genre } from '@/genre/entities/genre.entity';

@Injectable()
export class BookService {
  constructor(private em: EntityManager) {}

  async createBook(data: BookRequestShape['createBook']['body']) {
    const { title, author, genreId, total, imageUrl, summary } = data;

    const availableBook = await this.em.findOne(Book, { title, author });

    if (availableBook) {
      throw new BadRequestException(
        'Book with given title and author already exists',
      );
    }

    const bookGenre = await this.em.findOne(Genre, { id: genreId });

    if (!bookGenre) {
      throw new BadRequestException('Given genre is not available');
    }

    const newBook = new Book({
      title,
      author,
      genre: bookGenre,
      total,
      imageUrl,
      summary,
    });

    await this.em.persistAndFlush(newBook);
  }

  async getBookDetails(id: string) {
    const bookDetails = await this.em.findOne(
      Book,
      { id },
      { populate: ['genre'] },
    );

    if (!bookDetails) {
      throw new BadRequestException('Book not found');
    }

    const {
      title,
      author,
      genre,
      rating,
      summary,
      imageUrl,
      total,
      available,
    } = bookDetails;

    if (!genre) {
      throw new BadRequestException('Genre of the given book is not found');
    }

    return {
      title,
      author,
      genre: genre.title,
      rating,
      summary,
      imageUrl,
      total,
      available,
    };
  }

  async editBookDetails(data: BookRequestShape['editBook']['body']) {}

  async getAllBooks(query: BookRequestShape['getAllBooks']['query']) {}

  async deleteBook(query: BookRequestShape['deleteBook']['query']) {}
}
