import create from 'zustand';

interface State {
  query: string;
  page: number;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
}

export const useStore = create<State>((set) => ({
  query: '',
  page: 0,
  setQuery: (query) => set(() => ({ query })),
  setPage: (page) => set(() => ({ page })),
}));
