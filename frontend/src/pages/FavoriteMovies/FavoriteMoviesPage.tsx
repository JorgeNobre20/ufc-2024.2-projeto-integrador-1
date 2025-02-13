import { useNavigate } from "react-router";

import { MovieListTemplate } from "../../components";
import { useMovies } from "../../hooks/useMovies";
import { useNotification } from "../../hooks/useNotification";
import { useEffect, useState } from "react";
import { webApi } from "../../webservice/api";
import { useAuth } from "../../hooks/useAuth";
import { Movie } from "../../models";
import { ApiMovie } from "../../webservice/responses";

export function FavoritesPage() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { favoriteMovies, startFavoriteMovies } = useMovies();
  
  const { showMessage } = useNotification()
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  function navigateToRecommendations() {
    navigate("/");
  }

  async function getFavoriteMovies() {
    setIsLoadingMovies(true);

    try {
      const { data } = await webApi.get<{ savedMovies: ApiMovie[] }>(
        `/saved-movies/${userId}`
      );

      const mappedMovies: Movie[] = data.savedMovies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        launchYear: movie.releaseYear,
        genres: movie.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
          value: genre.name,
        })),
      }));

      startFavoriteMovies(mappedMovies);
    } catch {
      showMessage("Erro ao carregar filmes favoritados", true);
    } finally {
      setIsLoadingMovies(false);
    }
  }

  useEffect(() => {
    getFavoriteMovies();
  }, []);

  return (
    <MovieListTemplate
      movies={favoriteMovies}
      title="Minha Lista"
      headerButtonLabel="Ver recomendações"
      onPressHeaderButton={navigateToRecommendations}
      onChangeFinalYear={() => {}}
      onChangeInitialYear={() => {}}
      isLoadingMovies={isLoadingMovies}
      onSearchByGender={() => {}}
    />
  );
}
