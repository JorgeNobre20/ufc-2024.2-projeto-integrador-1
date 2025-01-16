import { useEffect, useMemo, useState } from "react";
import {
  FormControlLabel,
  TextField,
  Checkbox,
  Pagination,
} from "@mui/material";

import {
  CheckboxLabel,
  Container,
  ContentContainer,
  GenresList,
  Header,
  HeaderButtonContainer,
  LogoImage,
  LogoImageContainer,
  MovieListContainer,
  MovieListFooter,
  MoviesList,
  SideBar,
  SideBarTitle,
  Title,
  TitleContainer,
  YearFilterContainer,
} from "./MovieListTemplate.styles";

import logoImage from "../../assets/logo.svg";

import { MovieCard } from "../MovieCard/MovieCard";
import { MOVIE_GENRES } from "./MovieListTemplate.constants";
import { Movie, MovieGenre } from "../../models";

interface Props {
  title: string;
  headerButtonLabel: string;
  movies: Movie[];
  onPressHeaderButton: () => void;
  onChangeInitialYear: (selectedYear: number | null) => void;
  onChangeFinalYear: (selectedYear: number | null) => void;
  onChangeSelectedGenres: (selectedGenres: MovieGenre[]) => void;
}

export function MovieListTemplate({
  headerButtonLabel,
  title,
  movies,
  onPressHeaderButton,
  onChangeFinalYear,
  onChangeInitialYear,
  onChangeSelectedGenres,
}: Props) {
  const [initialYear, setInitialYear] = useState("");
  const [finalYear, setFinalYear] = useState("");

  const [selectedGenres, setSelectedGenres] = useState<MovieGenre[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>(MOVIE_GENRES);

  const selectedGenreIds = useMemo(() => {
    const genreIds = selectedGenres.map((genre) => genre.id);
    return genreIds;
  }, [selectedGenres]);

  function handleChangeInitialYear(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = validateYearFieldValue(event, initialYear);
    setInitialYear(newValue);

    if (newValue.length === 4) {
      onChangeInitialYear(parseInt(newValue));
    }
  }

  function handleChangeFinalYear(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = validateYearFieldValue(event, finalYear);
    setFinalYear(newValue);

    if (newValue.length === 4) {
      onChangeFinalYear(parseInt(newValue));
    }
  }

  function validateYearFieldValue(
    event: React.ChangeEvent<HTMLInputElement>,
    currentValue: string
  ) {
    if (event.target.value.length > 4) {
      return currentValue;
    }

    const onlyNumbers = event.target.value.replace(/[^0-9]/g, "");
    return onlyNumbers;
  }

  function onChangeGenreCheckbox(
    genre: MovieGenre,
    wasPreviousChecked: boolean
  ) {
    let updatedSelectedGenres = [];

    if (wasPreviousChecked) {
      updatedSelectedGenres = selectedGenres.filter(
        (genre) => genre.id !== genre.id
      );
    } else {
      updatedSelectedGenres = [...selectedGenres, genre];
    }

    setSelectedGenres([...selectedGenres, genre]);
    onChangeSelectedGenres(updatedSelectedGenres);
  }

  useEffect(() => {
    setGenres(MOVIE_GENRES);
  }, []);

  return (
    <Container>
      <Header>
        <LogoImageContainer>
          <LogoImage src={logoImage} alt="Movie Runner" />
        </LogoImageContainer>

        <TitleContainer>
          <Title>{title}</Title>

          <HeaderButtonContainer>
            <button onClick={onPressHeaderButton}>{headerButtonLabel}</button>
          </HeaderButtonContainer>
        </TitleContainer>
      </Header>

      <ContentContainer>
        <SideBar>
          <SideBarTitle>Gêneros</SideBarTitle>

          <GenresList>
            {genres.map((genre) => (
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    onChange={(_, wasPreviousChecked) =>
                      onChangeGenreCheckbox(genre, wasPreviousChecked)
                    }
                    checked={selectedGenreIds.includes(genre.id)}
                  />
                }
                label={<CheckboxLabel>{genre.name}</CheckboxLabel>}
              />
            ))}
          </GenresList>

          <SideBarTitle>Data de lançamento</SideBarTitle>
          <YearFilterContainer>
            <TextField
              label="De"
              variant="outlined"
              className="year-input"
              inputMode="numeric"
              size="small"
              value={initialYear}
              onChange={handleChangeInitialYear}
            />

            <TextField
              label="Até"
              variant="outlined"
              className="year-input"
              inputMode="numeric"
              size="small"
              value={finalYear}
              onChange={handleChangeFinalYear}
            />
          </YearFilterContainer>
        </SideBar>

        <MovieListContainer>
          <MoviesList>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MoviesList>

          <MovieListFooter>
            <Pagination count={10} shape="rounded" />
          </MovieListFooter>
        </MovieListContainer>
      </ContentContainer>
    </Container>
  );
}
