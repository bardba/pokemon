import Image from 'next/image';

interface IPokemon {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
}

async function getData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  const pokemonList = data.results.map((pokemon: IPokemon) => {
    const id = pokemon.url.split('/')[6];
    return {
      id: id,
      name: pokemon.name,
      url: pokemon.url,
      thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold text-white">포켓몬 도감</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 min-h-[600px]">
        {pokemonList.map((pokemon: IPokemon) => {
          return (
            <div
              key={pokemon.name}
              className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4 min-h-[150px]"
            >
              <Image
                src={pokemon.thumbnail}
                width={40}
                height={40}
                alt="brand"
                placeholder="blur"
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
              <p className="text-xl font-bold text-gray-800">{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
