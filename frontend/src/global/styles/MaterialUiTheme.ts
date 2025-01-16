import { createTheme } from "@mui/material/styles";
import { theme } from "./theme";

export const materiaUiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: theme.colors.primary,
    },
    text: {
      primary: theme.colors.light
    }
  },
});

export const globalStyles = {
  "*": {
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
    fontFamily: "Roboto, sans-serif",
  },

  body: {
    background: theme.colors.background
  }
}
