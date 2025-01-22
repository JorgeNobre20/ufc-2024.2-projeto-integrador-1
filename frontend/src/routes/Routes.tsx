import { BrowserRouter, Routes as ReactRouterDomRoutes, Route } from "react-router";

import { RecommendationsPage } from "../pages/Recommendations/RecommendationsPage";
import { FavoritesPage } from "../pages/FavoriteMovies/FavoriteMoviesPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { RegisterPage } from "../pages/Register/RegisterPage";


export function Routes(){
  return (
    <BrowserRouter>
      <ReactRouterDomRoutes>
        <Route index path="/" Component={RecommendationsPage} />
        <Route index path="/favorites" Component={FavoritesPage} />
        <Route index path="/login" Component={LoginPage} />
        <Route index path="/register" Component={RegisterPage} />
      </ReactRouterDomRoutes>
    </BrowserRouter>
  ) 
}