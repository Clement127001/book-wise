import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { bookContract } from 'contract/book/contract';
import { BookService } from '@/book/book.service';
import {
  AdminOnlyAuth,
  Auth,
  getAccountFromToken,
} from '@/auth/decorators/auth.decorator';
import { Account } from '@/auth/entities/account.entity';

const bookController = nestControllerContract(bookContract);
export type BookRequestShape = NestRequestShapes<typeof bookController>;

@Controller()
export class BookController
  implements NestControllerInterface<typeof bookContract>
{
  constructor(private readonly bookService: BookService) {}

  @AdminOnlyAuth()
  @TsRest(bookContract.createBook)
  async createBook(@TsRestRequest() { body }: BookRequestShape['createBook']) {
    await this.bookService.createBook(body);

    return {
      status: 201 as const,
      body: {
        success: true,
        message: 'Book created successfully',
      },
    };
  }

  @Auth()
  @TsRest(bookContract.getBookDetails)
  async getBookDetails(
    @TsRestRequest() { query }: BookRequestShape['getBookDetails'],
    @getAccountFromToken() account: Account,
  ) {
    const data = await this.bookService.getBookDetails(query.id, account);

    return {
      status: 200 as const,
      body: data,
    };
  }

  @AdminOnlyAuth()
  @TsRest(bookContract.editBook)
  async editBook(
    @TsRestRequest() { body, query }: BookRequestShape['editBook'],
  ) {
    await this.bookService.editBookDetails(body, query.id);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Book details updated successfully',
      },
    };
  }

  // @TsRest(bookContract.getAllBooks)
  // async getAllBooks(
  //   @TsRestRequest() { query }: BookRequestShape['getAllBooks'],
  // ) {
  //   await this.bookService.getAllBooks(query);
  // }

  @AdminOnlyAuth()
  @TsRest(bookContract.deleteBook)
  async deleteBook(@TsRestRequest() { query }: BookRequestShape['deleteBook']) {
    await this.bookService.deleteBook(query.id);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Book is deleted successfully',
      },
    };
  }
}
