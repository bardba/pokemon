'use client';

import { ChangeEvent, useEffect } from 'react';
import { useSearchTermStore } from '../lib/store';

const SearchPokemons = () => {
  const { searchTerm, setSearchTerm, searchPokemon } = useSearchTermStore();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      searchPokemon();
    }
  }, [searchTerm]);

  return (
    <input
      className="w-full p-2 rounded-md shadow-md text-black mt-10"
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="포켓몬 아이디를 입력하세요."
    />
  );
};

export default SearchPokemons;
