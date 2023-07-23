type pokemonListQueryParams = {
  query: string;
};

export async function getPokemonList({ query }: pokemonListQueryParams) {
  const response = await fetch(query);

  return response.json();
}

type pokemonInfoQueryParams = {
  id: number;
};

export async function getPokemonInfoKor({ id }: pokemonInfoQueryParams) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  );

  return response.json();
}
