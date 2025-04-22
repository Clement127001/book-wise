import { Module } from '@nestjs/common';
import { GenreConroller } from './genre.controller';
import { GenreService } from './genre.service';

@Module({
  imports: [],
  controllers: [GenreConroller],
  providers: [GenreService],
  exports: [GenreService],
})
export class GenreModule {}
