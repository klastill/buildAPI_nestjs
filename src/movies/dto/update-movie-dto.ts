import { PartialType } from "@nestjs/mapped-types";
import { addMovieDto } from "./add-movie.dto";

export class updateMovieDto extends PartialType(addMovieDto) {}