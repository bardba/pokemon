interface IPokemon {
  id: number;
  name: string;
  url: string;
}

async function getData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  const pokemonList = data.results.map((pokemon: IPokemon) => {
    return {
      id: pokemon.url.split('/')[6],
      name: pokemon.name,
      url: pokemon.url,
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold text-white">포켓몬 도감</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {pokemonList.map((pokemon: IPokemon) => {
          return (
            <div
              key={pokemon.name}
              className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4"
            >
              <img
                className="h-auto max-w-full rounded-lg"
                src={`https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt=""
              />
              <p className="text-xl font-bold text-gray-800">{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
