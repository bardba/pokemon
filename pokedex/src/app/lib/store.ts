import { create } from 'zustand';
import { getPokemonInfo } from '@/app/api/pokemon'; // Ensure to import your API method
import { IPokemonSpecies } from '../types/pokemon';

type Store = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  searchResult: IPokemonSpecies | null;
  setSearchResult: (searchResults: IPokemonSpecies | null) => void;
  searchPokemon: () => Promise<void>;
};

export const useSearchTermStore = create<Store>((set, get) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm) => set(() => ({ searchTerm })),
  searchResult: null,
  setSearchResult: (searchResult) => set(() => ({ searchResult })),
  searchPokemon: async () => {
    const { searchTerm } = get();
    const results = await getPokemonInfo({ id: searchTerm });
    set({ searchResult: results });
  },
}));
