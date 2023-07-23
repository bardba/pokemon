import Pokemons from './components/Pokemons';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold text-white">포켓몬 도감</h1>
      <Pokemons />
    </main>
  );
}
