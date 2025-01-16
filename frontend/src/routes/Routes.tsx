import { BrowserRouter, Routes as ReactRouterDomRoutes, Route } from "react-router";

import { RecommendationsPage } from "../pages/Recommendations/RecommendationsPage";
import { FavoritesPage } from "../pages/FavoriteMovies/FavoriteMoviesPage";

export function Routes(){
  return (
    <BrowserRouter>
      <ReactRouterDomRoutes>
        <Route index path="/" Component={RecommendationsPage} />
        <Route index path="/favorites" Component={FavoritesPage} />
      </ReactRouterDomRoutes>
    </BrowserRouter>
  ) 
}