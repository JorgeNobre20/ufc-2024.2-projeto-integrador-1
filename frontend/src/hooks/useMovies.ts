import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export function useMovies() {
  const moviesContext = useContext(MovieContext);
  return { ...moviesContext };
}
