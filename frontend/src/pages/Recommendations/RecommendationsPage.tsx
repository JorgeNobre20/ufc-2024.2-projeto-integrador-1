import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { MovieListTemplate } from "../../components";
import { MOVIES } from "./Recommendations.constants";
import { Movie } from "../../models";

export function RecommendationsPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);

  function navigateToFavoriteMovies() {
    navigate("/favorites");
  }

  useEffect(() => {
    setMovies(MOVIES);
  }, []);

  return (
    <MovieListTemplate
      title="Início"
      headerButtonLabel="Ver Favoritos"
      onPressHeaderButton={navigateToFavoriteMovies}
      movies={movies}
      onChangeFinalYear={() => {}}
      onChangeInitialYear={() => {}}
      onChangeSelectedGenres={() => {}}
    />
  );
}
