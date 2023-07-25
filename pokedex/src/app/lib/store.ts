import { create } from 'zustand';
import { getPokemonEvolutionInfo, getPokemonInfo } from '@/app/api/pokemon';
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
  pokeEvolutionInfo: any;
};

export const useModalStore = create<ModalStore>((set) => ({
  showModal: false,
  pokeEvolutionInfo: null,
  setShowModal: async (showModal, id) => {
    const pokemonInfo = showModal ? await getPokemonInfo({ id }) : null;
    const pokeEvolutionInfo = showModal
      ? await getPokemonEvolutionInfo({
          id: pokemonInfo.evolution_chain.url.split('/')[6],
        })
      : null;
    set(() => ({ showModal, id, pokemonInfo, pokeEvolutionInfo }));
  },
  id: '',
  pokemonInfo: null,
}));
