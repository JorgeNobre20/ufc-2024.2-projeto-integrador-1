import { useState } from "react";
import { useNavigate } from "react-router";

import { MovieListTemplate } from "../../components";
import { Movie, MovieGenre } from "../../models";
import { webApi } from "../../webservice/api";
import { ApiMovie } from "../../webservice/responses";
import { useNotification } from "../../hooks/useNotification";

export function RecommendationsPage() {
  const navigate = useNavigate();
  const { showMessage } = useNotification()

  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);

  function navigateToFavoriteMovies() {
    navigate("/favorites");
  }

  async function handleSearchMoviesByGenres(genres: MovieGenre[]) {
    setIsLoadingMovies(true);

    try {
      const { data } = await webApi.get<{ movies: ApiMovie[] }>(
        `/recommendations-genre/${genres[0].name}`
      );

      const mappedMovies: Movie[] = data.movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        launchYear: movie.releaseYear,
        genres: movie.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
          value: genre.name,
        })),
      }));

      setMovies(mappedMovies);
    } catch {
      showMessage("Erro ao carregar filmes por gênero", true);
    } finally {
      setIsLoadingMovies(false);
    }
  }

  return (
    <>
      <MovieListTemplate
        title="Início"
        headerButtonLabel="Ver Favoritos"
        onPressHeaderButton={navigateToFavoriteMovies}
        movies={movies}
        onChangeFinalYear={() => {}}
        onChangeInitialYear={() => {}}
        isLoadingMovies={isLoadingMovies}
        onSearchByGender={handleSearchMoviesByGenres}
      />
    </>
  );
}
