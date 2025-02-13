import { useState } from "react";

import { Movie } from "../../models";
import {
  Card,
  CardHeader,
  LaunchYear,
  StarIcon,
  Title,
} from "./MovieCard.styles";

import starFilledIcon from "../../assets/icons/star-filled.svg";
import starOutlinedIcon from "../../assets/icons/star-outlined.svg";
import { useMovies } from "../../hooks/useMovies";
import { webApi } from "../../webservice/api";
import { useNotification } from "../../hooks/useNotification";
import { useAuth } from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { showMessage } = useNotification();
  const { userId } = useAuth();
  const { favoriteMovieIds, addFavoriteMovie, removeFavoriteMovie } =
    useMovies();
  const isFavorite = favoriteMovieIds.includes(movie.id);

  async function handleSaveMovieAsFavorite(movie: Movie) {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await webApi.post(`saved-movies/${userId}`, {
        movieId: movie.id,
      });

      showMessage("Filme favoritado com sucesso!", false);
      addFavoriteMovie(movie);
    } catch (error) {
      showMessage("Erro ao favoritar filme", true);
    } finally {
      setIsLoading(false);
    }
  }

  function onPressStarIcon(movie: Movie) {
    if (isFavorite) {
      // removeFavoriteMovie(movie);
    } else {
      handleSaveMovieAsFavorite(movie);
    }
  }

  return (
    <Card>
      <CardHeader>
        {isLoading ? (
          <CircularProgress size={16} />
        ) : (
          <StarIcon
            onClick={() => onPressStarIcon(movie)}
            src={isFavorite ? starFilledIcon : starOutlinedIcon}
            alt={isFavorite ? "Star filled" : "Star outlined"}
          />
        )}
      </CardHeader>
      <Title>{movie.title}</Title>
      <LaunchYear>{movie.launchYear}</LaunchYear>
    </Card>
  );
}
