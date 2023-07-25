import { INamedApiResource, IPokemon } from '../types/pokemon';

type pokemonListQueryParams = {
  query: string;
};

export async function getPokemonList({ query }: pokemonListQueryParams) {
  const response = await fetch(query);

  if (response.status === 404) {
    return null;
  }

  const data = await response.json();
  const pokemons = await Promise.all(
    data.results.map(async (pokemon: INamedApiResource<IPokemon>) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2];
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      const pokemonData = await getPokemonInfo({ id });

      return {
        ...pokemon,
        pokemonData,
        imageUrl,
        id,
      };
    })
  );

  return { ...data, results: pokemons };
}

type pokemonInfoQueryParams = {
  id: string;
};

export async function getPokemonInfo({ id }: pokemonInfoQueryParams) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );

  if (response.status === 404) {
    return null;
  }

  const data = await response.json();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return {
    ...data,
    imageUrl,
  };
}
