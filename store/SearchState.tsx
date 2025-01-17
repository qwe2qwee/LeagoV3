import { create } from "zustand";

interface SearchState {
  query: string;
  setQuery: (text: string) => void;
  clearQuery: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (text) => set(() => ({ query: text })),
  clearQuery: () => set(() => ({ query: "" })),
}));
