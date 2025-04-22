import { BadRequestException, Injectable } from '@nestjs/common';
import { BookRequestShape } from '@/book/book.controller';
import { Book } from '@/book/entities/book.entity';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Genre } from '@/genre/entities/genre.entity';
import { BorrowRequest } from './entities/borrowRequest.entity';
import { BorrowedBookStatusEnum, BorrowRequestStatusEnum } from 'contract/enum';
import { BorrowedBook } from './entities/borrowedBook.entity';

@Injectable()
export class BookService {
  constructor(private em: EntityManager) {}

  async createBook(data: BookRequestShape['createBook']['body']) {
    const { title, author, genreId, total, imageUrl, summary } = data;

    const book = await this.em.findOne(Book, { title, author });

    if (book) {
      throw new BadRequestException(
        'Book with given title and author already exists',
      );
    }

    const bookGenre = await this.em.findOneOrFail(Genre, { id: genreId });

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

  async editBookDetails(
    data: BookRequestShape['editBook']['body'],
    bookId: string,
  ) {
    const { title, summary, imageUrl, total, author, genreId } = data;

    const book = await this.em.findOneOrFail(Book, {
      id: bookId,
      isDeleted: false,
    });

    const [borrowRequestCount, borrowedBookCount] = await Promise.all([
      this.em.count(BorrowRequest, {
        book: bookId,
        $or: [
          { status: BorrowRequestStatusEnum.PENDING },
          { status: BorrowRequestStatusEnum.ACCEPTED },
        ],
      }),
      this.em.count(BorrowedBook, {
        book: bookId,
        status: BorrowedBookStatusEnum.BORROWED,
      }),
    ]);

    const requiredCount = borrowRequestCount + borrowedBookCount;

    if (total < requiredCount) {
      throw new BadRequestException(
        `Total books count cannot be less than required ${requiredCount}`,
      );
    }

    wrap(book).assign({
      title,
      author,
      genre: genreId,
      summary,
      imageUrl,
    });

    await this.em.flush();
  }

  async deleteBook(id: string) {
    const book = await this.em.findOneOrFail(Book, { id, isDeleted: false });

    const [borrowedBook, borrowRequest] = await Promise.all([
      this.em.findOne(BorrowedBook, {
        book: id,
        status: BorrowedBookStatusEnum.BORROWED,
      }),
      this.em.findOne(BorrowRequest, {
        book: id,
        $or: [
          { status: BorrowRequestStatusEnum.PENDING },
          { status: BorrowRequestStatusEnum.ACCEPTED },
        ],
      }),
    ]);

    if (borrowRequest || borrowedBook) {
      throw new BadRequestException(
        'Book cannot be deleted because it is currently borrowed or has pending/accepted borrow requests.',
      );
    }

    wrap(book).assign({ isDeleted: true });

    await this.em.flush();
  }

  //TODO: add extra details like canBuyBook for user, can delete book for admin
  async getBookDetails(id: string) {
    const bookDetails = await this.em.findOneOrFail(
      Book,
      { id, isDeleted: false },
      { populate: ['genre'] },
    );

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

  //TODO: add extra details like canBuyBook for user, can delete book for admin
  // async getAllBooks(query: BookRequestShape['getAllBooks']['query']) {}
}
