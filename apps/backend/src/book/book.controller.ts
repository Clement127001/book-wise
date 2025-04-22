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
}
