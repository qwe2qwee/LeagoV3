import { Gender } from "@/constants";
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

// Add validation to store
const validateGender = (gender: string): Gender =>
  ["male", "female", "other"].includes(gender) ? (gender as Gender) : "other";

export const useUserDetailsStore = create<UserDetailsStore>((set) => ({
  details: {
    address: "",
    birthday: "",
    gender: "other",
    name: "",
  },

  setDetails: (newDetails) =>
    set((state) => ({
      details: {
        ...state.details,
        ...newDetails,
        gender: newDetails.gender
          ? validateGender(newDetails.gender)
          : state.details.gender,
      },
    })),

  resetDetails: () =>
    set({
      details: {
        address: "",
        birthday: "",
        gender: "other",
        name: "",
      },
    }),
}));
