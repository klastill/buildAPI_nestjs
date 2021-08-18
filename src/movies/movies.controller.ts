import { addMovieDto } from './dto/add-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';

@Controller('movies')
export class MoviesController {

  constructor(readonly MoviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.MoviesService.getAll();
  }

  @Get(':id')
  getOne(@Param("id") movieId: number): Movie {
    return this.MoviesService.getOne(movieId);
  }

  @Post()
  addOne(@Body() movieData: addMovieDto) {
    return this.MoviesService.addOne(movieData);
  }

  @Delete(':id')
  deleteOne(@Param("id") movieId: number) {
    return this.MoviesService.deleteOne(movieId);
  }

  @Patch(':id')
  update(@Param("id") movieId: number, @Body() updateData) {
    return this.MoviesService.update(movieId, updateData);
  }
}
