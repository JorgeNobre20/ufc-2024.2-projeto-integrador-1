import {
  BrowserRouter,
  Routes as ReactRouterDomRoutes,
  Route,
} from "react-router";

import { RecommendationsPage } from "../pages/Recommendations/RecommendationsPage";
import { FavoritesPage } from "../pages/FavoriteMovies/FavoriteMoviesPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { RegisterPage } from "../pages/Register/RegisterPage";
import { VerifiedRoute } from "../components";

export function Routes() {
  return (
    <BrowserRouter>
      <ReactRouterDomRoutes>
        <Route element={<VerifiedRoute isAuthRoute={false} />}>
          <Route index path="/" Component={RecommendationsPage} />
          <Route path="/favorites" Component={FavoritesPage} />
        </Route>

        <Route element={<VerifiedRoute isAuthRoute={true} />}>
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
        </Route>
      </ReactRouterDomRoutes>
    </BrowserRouter>
  );
}
