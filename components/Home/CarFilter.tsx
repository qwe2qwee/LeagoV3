import { icons } from "@/constants";
import React from "react";
import { FlatList, Text, TouchableOpacity, Image, View } from "react-native";

interface CarFilterProps {
  selectedBrand: string | null;
  onSelectBrand: (brand: string | null) => void;
}

// Define car brands and corresponding logos
const carBrands = [
  { name: "Honda", logo: icons.hyundai },
  { name: "Toyota", logo: icons.hyundai },
  { name: "Mitsubishi", logo: icons.hyundai },
  { name: "MG", logo: icons.hyundai },
  { name: "Nissan", logo: icons.hyundai },
  { name: "Hyundai", logo: icons.hyundai },
  { name: "Kia", logo: icons.hyundai },
  { name: "Lexus", logo: icons.hyundai },
  { name: "Chevrolet", logo: icons.hyundai },
  { name: "Jeep", logo: icons.hyundai },
  { name: "Ford", logo: icons.hyundai },
  { name: "Chery", logo: icons.hyundai },

  { name: "BMW", logo: icons.hyundai },
  { name: "Mercedes-Benz", logo: icons.hyundai },
  { name: "Audi", logo: icons.hyundai },
  { name: "Infiniti", logo: icons.hyundai },
  { name: "GMC", logo: icons.hyundai },
  { name: "Dodge", logo: icons.hyundai },
  { name: "Suzuki", logo: icons.hyundai },
  { name: "Mazda", logo: icons.hyundai },
  { name: "Peugeot", logo: icons.hyundai },
  { name: "Tesla", logo: icons.hyundai },
  { name: "Volkswagen", logo: icons.hyundai },
  { name: "Volvo", logo: icons.hyundai },
  { name: "JAC", logo: icons.hyundai },
  { name: "Geely", logo: icons.hyundai },
  { name: "Subaru", logo: icons.hyundai },
  { name: "Land Rover", logo: icons.hyundai },
  { name: "Ferrari", logo: icons.hyundai },
  { name: "Bentley", logo: icons.hyundai },
  { name: "Bugatti", logo: icons.hyundai },
  { name: "Maserati", logo: icons.hyundai },
  { name: "Aston Martin", logo: icons.hyundai },
  { name: "Lamborghini", logo: icons.hyundai },
  { name: "Porsche", logo: icons.hyundai },
];

const CarFilter: React.FC<CarFilterProps> = ({
  selectedBrand,
  onSelectBrand,
}) => {
  return (
    <FlatList
      data={carBrands}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            onSelectBrand(selectedBrand === item.name ? null : item.name)
          }
          className={`flex-row items-center px-4 py-2 rounded-lg mr-2 ${
            selectedBrand === item.name ? "bg-textColor-800" : "bg-gray-200"
          }`}
        >
          <Image
            source={item.logo}
            style={{ width: 24, height: 24, marginRight: 6 }}
            resizeMode="contain"
          />
          <Text
            className={`text-center ${
              selectedBrand === item.name
                ? "text-white font-bold"
                : "text-black"
            }`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default CarFilter;
