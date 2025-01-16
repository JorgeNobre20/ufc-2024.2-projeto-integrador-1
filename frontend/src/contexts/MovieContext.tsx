import { createContext,  useMemo, useState } from "react";

import { Movie } from "../models";

interface MovieContextData {
  favoriteMovies: Movie[];
  favoriteMovieIds: number[];

  addFavoriteMovie: (movie: Movie) => void;
  removeFavoriteMovie: (movie: Movie) => void;
}


// eslint-disable-next-line react-refresh/only-export-components
export const MovieContext = createContext<MovieContextData>({} as MovieContextData);

interface MovieContextProviderProps {
  children: React.ReactNode;
}

export function MovieContextProvider({ children }: MovieContextProviderProps) {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const favoriteMovieIds = useMemo(() => {
    return favoriteMovies.map((movie) => movie.id);
  }, [favoriteMovies]);

  function addFavoriteMovie(movie: Movie) {
    setFavoriteMovies([...favoriteMovies, movie]);
  }

  function removeFavoriteMovie(movie: Movie) {
    const newFavoriteMovies = favoriteMovies.filter(
      (favoriteMovie) => favoriteMovie.id !== movie.id
    );

    setFavoriteMovies(newFavoriteMovies);
  }

  return (
    <MovieContext.Provider
      value={{
        favoriteMovies,
        favoriteMovieIds,
        addFavoriteMovie,
        removeFavoriteMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
