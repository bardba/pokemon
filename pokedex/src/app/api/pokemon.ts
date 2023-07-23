type pokemonListQueryParams = {
  query: string;
};

export type pokemonType = {
  name: string;
  url: string;
  id: string;
  imageUrl: string;
  info: any;
  pokemonData: {
    names: {
      name: string;
    }[];
  };
};

export async function getPokemonList({ query }: pokemonListQueryParams) {
  const response = await fetch(query);
  const data = await response.json();
  const pokemons = await Promise.all(
    data.results.map(async (pokemon: pokemonType) => {
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
    `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  );

  return response.json();
}
