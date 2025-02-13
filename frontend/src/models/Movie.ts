import { MovieGenre } from "./MovieGenre";

export type Movie = {
  id: number;
  title: string;
  launchYear: number;

  genres: MovieGenre[];
}