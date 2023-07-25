import { create } from 'zustand';
import { getPokemonInfo } from '@/app/api/pokemon'; // Ensure to import your API method
import { IPokemonSpecies } from '../types/pokemon';

type PokemonStore = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  searchResult: IPokemonSpecies | null;
  setSearchResult: (searchResults: IPokemonSpecies | null) => void;
  searchPokemon: () => Promise<void>;
};

export const useSearchTermStore = create<PokemonStore>((set, get) => ({
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

type ModalStore = {
  showModal: boolean;
  setShowModal: (showModal: boolean, id: string) => void;
  id: string;
  pokemonInfo: IPokemonSpecies | null;
};

export const useModalStore = create<ModalStore>((set) => ({
  showModal: false,
  setShowModal: async (showModal, id) => {
    const pokemonInfo = showModal ? await getPokemonInfo({ id }) : null;
    set(() => ({ showModal, id, pokemonInfo }));
  },
  id: '',
  pokemonInfo: null,
}));
