import { ApiGenre } from "./ApiGenre";

export type ApiMovie = {
  id: number;
  title: string;
  releaseYear: number;
  genres: ApiGenre[];
};