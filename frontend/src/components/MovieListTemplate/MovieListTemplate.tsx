import { useEffect, useMemo, useState } from "react";
import {
  FormControlLabel,
  // TextField,
  Checkbox,
  Pagination,
  Button,
} from "@mui/material";

import {
  CheckboxLabel,
  Container,
  ContentContainer,
  EmptyMovieListContainer,
  EmptyMovieListLabel,
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
  // YearFilterContainer,
} from "./MovieListTemplate.styles";

import logoImage from "../../assets/logo.svg";

import { Movie, MovieGenre } from "../../models";
import { webApi } from "../../webservice/api";
import { useNotification } from "../../hooks/useNotification";
import { ApiGenre } from "../../webservice/responses";
import { CenteredLoading } from "../CenteredLoading/CenteredLoading";
import { MovieCard } from "../MovieCard/MovieCard";

interface Props {
  title: string;
  headerButtonLabel: string;
  movies: Movie[];
  isLoadingMovies: boolean;
  onPressHeaderButton: () => void;
  onChangeInitialYear: (selectedYear: number | null) => void;
  onChangeFinalYear: (selectedYear: number | null) => void;
  onSearchByGender: (selectedGenres: MovieGenre[]) => void;
}

export function MovieListTemplate({
  headerButtonLabel,
  title,
  movies,
  isLoadingMovies,
  onPressHeaderButton,
  onSearchByGender,
}: Props) {
  const { showMessage } = useNotification();

  // const [initialYear, setInitialYear] = useState("");
  // const [finalYear, setFinalYear] = useState("");
  const [isLoadingGenres, setIsLoadingGenres] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<MovieGenre[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);

  const selectedGenreIds = useMemo(() => {
    const genreIds = selectedGenres.map((genre) => genre.id);
    return genreIds;
  }, [selectedGenres]);

  // function handleChangeInitialYear(event: React.ChangeEvent<HTMLInputElement>) {
  //   const newValue = validateYearFieldValue(event, initialYear);
  //   setInitialYear(newValue);

  //   if (newValue.length === 4) {
  //     onChangeInitialYear(parseInt(newValue));
  //   }
  // }

  // function handleChangeFinalYear(event: React.ChangeEvent<HTMLInputElement>) {
  //   const newValue = validateYearFieldValue(event, finalYear);
  //   setFinalYear(newValue);

  //   if (newValue.length === 4) {
  //     onChangeFinalYear(parseInt(newValue));
  //   }
  // }

  // function validateYearFieldValue(
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   currentValue: string
  // ) {
  //   if (event.target.value.length > 4) {
  //     return currentValue;
  //   }

  //   const onlyNumbers = event.target.value.replace(/[^0-9]/g, "");
  //   return onlyNumbers;
  // }

  function onChangeGenreCheckbox(
    checkboxGender: MovieGenre,
    shouldBeChecked: boolean
  ) {
    let updatedSelectedGenres = [];

    if (!shouldBeChecked) {
      updatedSelectedGenres = selectedGenres.filter(
        (genre) => genre.id !== checkboxGender.id
      );
    } else {
      updatedSelectedGenres = [...selectedGenres, checkboxGender];
    }

    setSelectedGenres(updatedSelectedGenres);
  }

  async function loadGenres() {
    setIsLoadingGenres(true);

    try {
      const { data } = await webApi.get<{ genres: ApiGenre[] }>("/genres");

      const mappedGenres = data.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
        value: genre.name,
      }));

      setGenres(mappedGenres);
    } catch {
      showMessage("Erro ao carregar gêneros", true);
    } finally {
      setIsLoadingGenres(false);
    }
  }

  useEffect(() => {
    loadGenres();
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
                    onChange={(_, shouldBeChecked) =>
                      onChangeGenreCheckbox(genre, shouldBeChecked)
                    }
                    checked={selectedGenreIds.includes(genre.id)}
                  />
                }
                label={<CheckboxLabel>{genre.name}</CheckboxLabel>}
              />
            ))}
          </GenresList>

          <Button
            variant="contained"
            disabled={
              selectedGenreIds.length === 0 ||
              isLoadingGenres ||
              isLoadingMovies
            }
            onClick={() => onSearchByGender(selectedGenres)}
          >
            Buscar
          </Button>

          {/* <SideBarTitle>Data de lançamento</SideBarTitle>
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
          </YearFilterContainer> */}
        </SideBar>

        <MovieListContainer>
          {isLoadingMovies ? (
            <CenteredLoading />
          ) : (
            <>
              {movies.length > 0 ? (
                <>
                  <MoviesList>
                    {movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </MoviesList>

                  <MovieListFooter>
                    <Pagination count={10} shape="rounded" />
                  </MovieListFooter>
                </>
              ) : (
                <EmptyMovieListContainer>
                  <EmptyMovieListLabel>
                    Nenhum filme encontrado
                  </EmptyMovieListLabel>
                </EmptyMovieListContainer>
              )}
            </>
          )}
        </MovieListContainer>
      </ContentContainer>
    </Container>
  );
}
