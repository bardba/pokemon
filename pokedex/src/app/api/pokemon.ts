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

type pokemonEvolutionInfoQueryParams = {
  id: string;
};

type pokemonEvolutionInfo = {
  id: string;
  name: string;
  min_level?: string;
  trigger_name?: string;
  trigger_url?: string;
  nameKor: string;
};

export async function getPokemonEvolutionInfo({
  id,
}: pokemonEvolutionInfoQueryParams) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/evolution-chain/${id}`
  );

  if (response.status === 404) {
    return null;
  }

  const data = await response.json();
  let chain = data.chain;

  // Initialize evolution chain array
  let evolutionChain = [];

  while (chain != null) {
    let speciesUrlParts = chain.species.url.split('/');
    let pokemonId = speciesUrlParts[speciesUrlParts.length - 2]; // get the second last part of the url which is the id

    // Fetch the pokemon's detail to get Korean name
    const pokemonDetailResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );
    const pokemonDetail = await pokemonDetailResponse.json();
    const koreanName = pokemonDetail.names.filter(
      (name: { language: { name: string } }) => name.language.name === 'ko'
    )[0].name;

    let evolutionInfo: pokemonEvolutionInfo = {
      id: pokemonId,
      name: chain.species.name,
      nameKor: koreanName,
    };

    if (
      chain.evolves_to.length > 0 &&
      chain.evolves_to[0].evolution_details.length > 0
    ) {
      let evolutionDetails = chain.evolves_to[0].evolution_details[0];
      evolutionInfo['min_level'] = evolutionDetails.min_level
        ? `레벨 ${evolutionDetails.min_level} 이상`
        : '특별한 조건 없음';
      evolutionInfo['trigger_name'] = evolutionDetails.trigger.name;
    }

    evolutionChain.push(evolutionInfo);

    if (chain.evolves_to.length > 0) {
      chain = chain.evolves_to[0];
    } else {
      chain = null;
    }
  }

  return evolutionChain;
}
