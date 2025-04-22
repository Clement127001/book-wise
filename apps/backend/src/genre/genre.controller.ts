import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { genreContract } from 'contract/genre/contract';
import { GenreService } from '@/genre/genre.service';

const genreController = nestControllerContract(genreContract);
export type GenreRequestShape = NestRequestShapes<typeof genreController>;

@Controller()
export class GenreConroller
  implements NestControllerInterface<typeof genreContract>
{
  constructor(private readonly genreService: GenreService) {}

  @TsRest(genreContract.createGenre)
  async createGenre(
    @TsRestRequest()
    { body }: GenreRequestShape['createGenre'],
  ) {
    await this.genreService.createGenre(body);

    return {
      status: 201 as const,
      body: {
        success: true,
        message: 'Genre created successfully',
      },
    };
  }

  @TsRest(genreContract.getAllGenres)
  async getAllGenres() {
    const genres = await this.genreService.getAllGenres();

    return {
      status: 200 as const,
      body: { genres },
    };
  }
}
