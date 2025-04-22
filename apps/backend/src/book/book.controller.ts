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

const bookController = nestControllerContract(bookContract);
export type BookRequestShape = NestRequestShapes<typeof bookController>;

@Controller()
export class BookController
  implements NestControllerInterface<typeof bookContract>
{
  constructor(private readonly bookService: BookService) {}

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

  @TsRest(bookContract.getBookDetails)
  async getBookDetails(
    @TsRestRequest() { query }: BookRequestShape['getBookDetails'],
  ) {
    const data = await this.bookService.getBookDetails(query.id);

    return {
      status: 200 as const,
      body: data,
    };
  }

  @TsRest(bookContract.editBook)
  async editBook(@TsRestRequest() { body }: BookRequestShape['editBook']) {
    await this.bookService.editBookDetails(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Book details updated successfully',
      },
    };
  }

  @TsRest(bookContract.getAllBooks)
  async getAllBooks(
    @TsRestRequest() { query }: BookRequestShape['getAllBooks'],
  ) {
    await this.bookService.getAllBooks(query);
  }

  @TsRest(bookContract.deleteBook)
  async deleteBook(@TsRestRequest() { query }: BookRequestShape['deleteBook']) {
    await this.bookService.deleteBook(query);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Book is deleted successfully',
      },
    };
  }
}
