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

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  const { favoriteMovieIds, addFavoriteMovie, removeFavoriteMovie } = useMovies();
  const isFavorite = favoriteMovieIds.includes(movie.id);

  function onPressStarIcon(movie: Movie) {
    if (isFavorite) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
  }

  return (
    <Card>
      <CardHeader>
        <StarIcon
          onClick={() => onPressStarIcon(movie)}
          src={isFavorite ? starFilledIcon : starOutlinedIcon}
          alt={isFavorite ? "Star filled" : "Star outlined"}
        />
      </CardHeader>
      <Title>{movie.title}</Title>
      <LaunchYear>{movie.launchYear}</LaunchYear>
    </Card>
  );
}
