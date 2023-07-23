import { create } from 'zustand';

interface State {
  offset: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const usePaginationStore = create<State>((set, get) => ({
  offset: 0,
  page: 0,
  limit: 12,
  setPage: (page: number) => {
    const offset = page * get().limit;
    set({ ...get(), page, offset });
  },
  nextPage: () => {
    const { page } = get();
    get().setPage(page + 1);
  },
  prevPage: () => {
    const { page } = get();
    get().setPage(page - 1);
  },
}));
