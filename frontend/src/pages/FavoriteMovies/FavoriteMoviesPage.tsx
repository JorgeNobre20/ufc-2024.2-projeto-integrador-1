import { useNavigate } from "react-router";

import { MovieListTemplate } from "../../components";
import { useMovies } from "../../hooks/useMovies";

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favoriteMovies } = useMovies();

  function navigateToRecommendations() {
    navigate("/");
  }

  return (
    <MovieListTemplate
      movies={favoriteMovies}
      title="Minha Lista"
      headerButtonLabel="Ver recomendações"
      onPressHeaderButton={navigateToRecommendations}
      onChangeFinalYear={() => {}}
      onChangeInitialYear={() => {}}
      onChangeSelectedGenres={() => {}}
    />
  );
}
