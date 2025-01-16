import { GlobalStyles, ThemeProvider } from "@mui/material";

import { globalStyles, materiaUiTheme } from "./global/styles/MaterialUiTheme";
import { MovieContextProvider } from "./contexts/MovieContext";
import { Routes } from "./routes/Routes";

export function App() {
  return (
    <ThemeProvider theme={materiaUiTheme} defaultMode="dark">
      <GlobalStyles styles={globalStyles} />

      <MovieContextProvider>
        <Routes />
      </MovieContextProvider>
    </ThemeProvider>
  );
}
