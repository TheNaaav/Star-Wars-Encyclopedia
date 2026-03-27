export type BaseEntity = { url?: string; id?: number };

export type LinkedResource = { id: number; name?: string; title?: string };

export type Film = BaseEntity & {
  title: string;
  episode_id: number | string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  image_url?: string;
  characters?: LinkedResource[];
  planets?: LinkedResource[];
  species?: LinkedResource[];
  starships?: LinkedResource[];
  vehicles?: LinkedResource[];
  characters_count?: number;
  planets_count?: number;
  species_count?: number;
  starships_count?: number;
  vehicles_count?: number;
};

export type Person = BaseEntity & {
  name: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  image_url?: string;
  wiki_link?: string;
  affiliations?: string[];
  homeworld?: LinkedResource;
  films?: LinkedResource[];
  species?: LinkedResource[];
  starships?: LinkedResource[];
  vehicles?: LinkedResource[];
  films_count?: number;
  species_count?: number;
  starships_count?: number;
  vehicles_count?: number;
};

export type Planet = BaseEntity & {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  diameter: string;
  gravity: string;
  orbital_period: string;
  rotation_period: string;
  surface_water: string;
  residents?: LinkedResource[] | string[];
  films?: LinkedResource[] | string[];
  residents_count?: number;
  films_count?: number;
};

export type Species = BaseEntity & {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld?: LinkedResource | string | null;
  people?: LinkedResource[] | string[];
  films?: LinkedResource[] | string[];
  people_count?: number;
  films_count?: number;
};

export type Starship = BaseEntity & {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  starship_class: string;
  max_atmosphere_speed?: string;
  hyperdrive_rating?: string;
  MGLT?: string;
  cargo_capacity?: string;
  consumables?: string;
  films?: LinkedResource[] | string[];
  pilots?: LinkedResource[] | string[];
  pilots_count?: number;
  films_count?: number;
};

export type Vehicle = BaseEntity & {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  vehicle_class: string;
  max_atmosphere_speed?: string;
  cargo_capacity?: string;
  consumables?: string;
  films?: LinkedResource[] | string[];
  pilots?: LinkedResource[] | string[];
  pilots_count?: number;
  films_count?: number;
};

export type ResourceKind =
  | "films"
  | "people"
  | "planets"
  | "species"
  | "starships"
  | "vehicles";

export type ResourceTitle = { label: string; value: number | string };
