import { create } from "zustand";

interface UserDetails {
  address: string;
  birthday: string;
  gender: "male" | "female" | "other";
  name: string;
}

interface UserDetailsStore {
  details: UserDetails;
  setDetails: (newDetails: Partial<UserDetails>) => void; // Allow updating specific fields
  resetDetails: () => void; // Reset to initial state
}

export const useUserDetailsStore = create<UserDetailsStore>((set) => ({
  details: {
    address: "unknown",
    birthday: "1999-01-01",
    gender: "other",
    name: "Hossin",
  },

  setDetails: (newDetails) =>
    set((state) => ({
      details: { ...state.details, ...newDetails },
    })),

  resetDetails: () =>
    set({
      details: {
        address: "unknown",
        birthday: "1999-01-01",
        gender: "other",
        name: "user",
      },
    }),
}));
