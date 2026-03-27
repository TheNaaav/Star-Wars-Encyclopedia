import type { RouteObject } from "react-router-dom";
import FilmsPage from "../pages/films/FilmsPage";
import FilmDetailsPage from "../pages/films/FilmDetailsPage";
import PeoplePage from "../pages/people/PeoplePage";
import PersonDetailsPage from "../pages/people/PersonDetailsPage";
import PlanetsPage from "../pages/planets/PlanetsPage";
import PlanetDetailsPage from "../pages/planets/PlanetDetailsPage";
import SpeciesPage from "../pages/species/SpeciesPage";
import SpeciesDetailsPage from "../pages/species/SpeciesDetailsPage";
import StarshipsPage from "../pages/starships/StarshipsPage";
import StarshipDetailsPage from "../pages/starships/StarshipDetailsPage";
import VehiclesPage from "../pages/vehicles/VehiclesPage";
import VehicleDetailsPage from "../pages/vehicles/VehicleDetailsPage";

export const routes: RouteObject[] = [
  { path: "/", element: <FilmsPage /> },

  { path: "/films", element: <FilmsPage /> },
  { path: "/films/:id", element: <FilmDetailsPage /> },

  { path: "/people", element: <PeoplePage /> },
  { path: "/people/:id", element: <PersonDetailsPage /> },

  { path: "/planets", element: <PlanetsPage /> },
  { path: "/planets/:id", element: <PlanetDetailsPage /> },

  { path: "/species", element: <SpeciesPage /> },
  { path: "/species/:id", element: <SpeciesDetailsPage /> },

  { path: "/starships", element: <StarshipsPage /> },
  { path: "/starships/:id", element: <StarshipDetailsPage /> },

  { path: "/vehicles", element: <VehiclesPage /> },
  { path: "/vehicles/:id", element: <VehicleDetailsPage /> },
];
