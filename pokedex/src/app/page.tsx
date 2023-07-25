import Pokemons from './components/Pokemons';
import ResultPokemons from './components/ResultPokemons';
import SearchPokemons from './components/SearchPokemons';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl font-bold text-white">포켓몬 도감</h1>
      <SearchPokemons />
      <ResultPokemons />
      <Pokemons />
    </main>
  );
}
