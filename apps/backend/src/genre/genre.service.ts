import { EntityManager, QueryOrder } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GenreRequestShape } from '@/genre/genre.controller';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private em: EntityManager) {}

  async createGenre(data: GenreRequestShape['createGenre']['body']) {
    const { title } = data;

    const newTitle =
      title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

    const genre = await this.em.findOne(Genre, { title: newTitle });

    if (genre) {
      throw new BadRequestException('Genre with given title is already exists');
    }

    const newGenre = new Genre({ title: newTitle });
    await this.em.persistAndFlush(newGenre);
  }

  async getAllGenres() {
    const genres = await this.em.findAll(Genre, {
      orderBy: { createdAt: QueryOrder.ASC },
    });
    return genres;
  }
}
