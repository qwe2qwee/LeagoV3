// store/useCarStore.ts
import { create } from "zustand";

interface RentType {
  daily: { price: number; availability: boolean };
  weekly: { price: number; availability: boolean };
  monthly: { price: number; availability: boolean };
}

interface CarDetails {
  name: Record<"en" | "ar", string>;
  color?: string;
  year?: number;
  image: string[];
  rentType: RentType;
}

interface CarState {
  carId: string | null;
  carDetails: CarDetails | null;
  carName: string | null;
  carRentSalary: RentType | null;
  carImages: string[];
  carImage: string | null;
  ownerId: string | null;
  carCity: string | null;
  setCarParams: (params: {
    carId: string;
    carDetails: CarDetails;
    carName: string;
    carRentSalary: RentType;
    carImages: string[];
    carImage: string;
    ownerId: string;
    carCity: string;
  }) => void;
  clearCarParams: () => void;
}

const useCarStore = create<CarState>((set) => ({
  carId: null,
  carDetails: null,
  carName: null,
  carRentSalary: null,
  carImages: [],
  carImage: null,
  ownerId: null,
  carCity: null,

  setCarParams: (params) =>
    set({
      carId: params.carId,
      carDetails: params.carDetails,
      carName: params.carName,
      carRentSalary: params.carRentSalary,
      carImages: params.carImages,
      carImage: params.carImage,
      ownerId: params.ownerId,
      carCity: params.carCity,
    }),

  clearCarParams: () =>
    set({
      carId: null,
      carDetails: null,
      carName: null,
      carRentSalary: null,
      carImages: [],
      carImage: null,
      ownerId: null,
      carCity: null,
    }),
}));

export default useCarStore;
