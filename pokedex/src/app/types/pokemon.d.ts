export interface INamedApiResource<T> {
  name: string;
  url: string;
  imageUrl?: string;
  id?: string;
  pokemonData?: IPokemonSpecies;
}

export interface INamedApiResourceList<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<INamedApiResource<T>>;
}

export interface IPokemonList {
  count: number;
  next: string;
  previous: string;
  results: Array<INamedApiResource<IPokemon>>;
}

export interface IPokemonSpecies {
  imageUrl?: string;
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: any;
  pokedex_numbers: any[];
  egg_groups: any;
  color: any;
  shape: any;
  evolves_from_species: any;
  evolution_chain: any;
  habitat: any;
  generation: any;
  names: any[];
  pal_park_encounters: any[];
  flavor_text_entries: any[];
  form_descriptions: any[];
  genera: any[];
  varieties: any[];
}

export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: any[];
  forms: any[];
  game_indices: any[];
  held_items: any[];
  location_area_encounters: string;
  moves: any[];
  sprites: any;
  species: any;
  stats: any[];
  types: any[];
}
