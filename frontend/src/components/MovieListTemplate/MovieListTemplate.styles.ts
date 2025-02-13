import styled from "@emotion/styled";
import { css, Typography } from "@mui/material";

import { theme } from "../../global/styles/theme";

export const Container = styled.main`
  padding: 2rem 1rem;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
`;

const leftSectionStyle = css`
  width: 25%;
  min-width: 22rem;
`;

export const LogoImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${leftSectionStyle}
`;

export const LogoImage = styled.img`
  height: 1.6rem;
  width: auto;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  h1 {
    width: 50%;
    text-align: right;
    color: ${theme.colors.light};
  }
`;

export const HeaderButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  width: 50%;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${theme.colors.light};
  }
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${theme.colors.light};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  margin-top: 2rem;
`;

export const SideBar = styled.aside`
  display: flex;
  flex-direction: column;

  ${leftSectionStyle}
`;

export const SideBarTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${theme.colors.light};

  margin-bottom: 1rem;
`;

export const GenresList = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0rem 0.6rem;
  margin-bottom: 2rem;

  max-height: 60vh;
  overflow-y: scroll;
`;

export const CheckboxLabel = styled(Typography)`
  color: ${theme.colors.light};
`;

export const YearFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.4rem;

  .year-input {
    width: 48%;
  }
`;

export const MovieListContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const MoviesList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, 8rem);
  grid-template-rows: repeat(auto-fit, 10rem);

  width: 100%;
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 0rem 0.6rem;

  height: 74vh;
  overflow-y: scroll;
`;


export const EmptyMovieListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 74vh;
`;

export const EmptyMovieListLabel = styled.p`
  color: ${theme.colors.light};
  text-align: center;
  margin-top: 1rem;
`;

export const MovieListFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 0;
`;
