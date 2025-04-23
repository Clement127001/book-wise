import { BadRequestException, Injectable } from '@nestjs/common';
import { BookRequestShape } from '@/book/book.controller';
import { Book } from '@/book/entities/book.entity';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Genre } from '@/genre/entities/genre.entity';
import { BorrowRequest } from './entities/borrowRequest.entity';
import {
  BorrowedBookStatusEnum,
  BorrowRequestStatusEnum,
  UserRoleEnum,
} from 'contract/enum';
import { BorrowedBook } from './entities/borrowedBook.entity';
import { Account } from '@/auth/entities/account.entity';
import { getMonthStartAndEndDate } from '@/utils';
import { MaxAllowedBookPerMonth } from '@/constants';

@Injectable()
export class BookService {
  constructor(private em: EntityManager) {}

  private async canDeleteBookByAdmin(id: string) {
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

    return !(borrowRequest || borrowedBook);
  }

  private async canBorrowBookByUser(id: string, account: Account) {
    if (!account.user) {
      throw new BadRequestException('User not found');
    }

    const { startDate, endDate } = getMonthStartAndEndDate();

    const [
      borrowRequest,
      borrowedBook,
      activeBorrowedBooksCount,
      activeBorrowRequestCount,
    ] = await Promise.all([
      this.em.findOne(BorrowRequest, {
        book: id,
        user: account.user.id,
        $or: [
          { status: BorrowRequestStatusEnum.EXPIRED },
          { status: BorrowRequestStatusEnum.REJECTED },
        ],
        coolDownExpiresAt: { $gte: new Date() },
      }),
      this.em.findOne(BorrowedBook, {
        book: id,
        user: account.user.id,
        status: BorrowedBookStatusEnum.BORROWED,
      }),
      this.em.count(BorrowedBook, {
        user: account.user.id,
        createdAt: { $gte: startDate, $lt: endDate },
      }),
      this.em.count(BorrowRequest, {
        user: account.user.id,
        $or: [
          { status: BorrowRequestStatusEnum.ACCEPTED },
          { status: BorrowRequestStatusEnum.PENDING },
        ],
        createdAt: { $gte: startDate, $lt: endDate },
      }),
    ]);

    const activeBookCount = activeBorrowRequestCount + activeBorrowedBooksCount;

    return (
      !(borrowRequest || borrowedBook) &&
      activeBookCount < MaxAllowedBookPerMonth
    );
  }

  private async transformBookData(account: Account, bookDetails: Book) {
    const { role } = account;

    const {
      id,
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

    const data = {
      title,
      author,
      genre: genre.title,
      rating,
      summary,
      imageUrl,
      total,
      available,
    };

    if (role === UserRoleEnum.ADMIN) {
      const canDeleteBook = await this.canDeleteBookByAdmin(id);
      return { ...data, canDeleteBook: canDeleteBook };
    } else {
      const canBorrowBook = await this.canBorrowBookByUser(id, account);
      return { ...data, canBorrowBook };
    }
  }

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

  async getBookDetails(id: string, account: Account) {
    const bookDetails = await this.em.findOneOrFail(
      Book,
      { id, isDeleted: false },
      { populate: ['genre.title'] },
    );

    return await this.transformBookData(account, bookDetails);
  }

  async deleteBook(id: string) {
    const book = await this.em.findOneOrFail(Book, { id, isDeleted: false });

    const canDeleteBook = await this.canDeleteBookByAdmin(id);

    if (!canDeleteBook) {
      throw new BadRequestException(
        'Book cannot be deleted because it is currently borrowed or has pending/accepted borrow requests.',
      );
    }

    wrap(book).assign({ isDeleted: true });

    await this.em.flush();
  }

  async getAllBooks(
    query: BookRequestShape['getAllBooks']['query'],
    account: Account,
  ) {
    const { pageNumber, pageSize } = query;

    const [books, count] = await this.em.findAndCount(
      Book,
      {},
      {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
        populate: ['genre.title'],
      },
    );

    const booksResult = await Promise.all(
      books.map(async (book) => await this.transformBookData(account, book)),
    );

    return { count, booksResult };
  }
}
