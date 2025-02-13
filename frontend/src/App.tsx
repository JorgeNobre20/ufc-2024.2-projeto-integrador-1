import { GlobalStyles, ThemeProvider } from "@mui/material";

import { globalStyles, materiaUiTheme } from "./global/styles/MaterialUiTheme";

import { MovieContextProvider } from "./contexts/MovieContext";
import { AuthContextProvider } from "./contexts/AuthContext";

import { Routes } from "./routes/Routes";
import { NotificationContextProvider } from "./contexts/NotificationContext";

export function App() {
  return (
    <ThemeProvider theme={materiaUiTheme}>
      <GlobalStyles styles={globalStyles} />

      <NotificationContextProvider>
        <AuthContextProvider>
          <MovieContextProvider>
            <Routes />
          </MovieContextProvider>
        </AuthContextProvider>
      </NotificationContextProvider>
    </ThemeProvider>
  );
}
