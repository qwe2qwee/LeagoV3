import { icons } from "@/constants";
import React from "react";
import { FlatList, Text, TouchableOpacity, Image, View } from "react-native";

interface CarFilterProps {
  selectedBrand: string | null;
  onSelectBrand: (brand: string) => void;
}

// Define car brands and corresponding logos
const carBrands = [
  { name: "Toyota", logo: icons.hyundai },
  { name: "Honda", logo: icons.hyundai },
  { name: "BMW", logo: icons.hyundai },
  { name: "Mercedes", logo: icons.hyundai },
  { name: "Nissan", logo: icons.hyundai },
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
          onPress={() => onSelectBrand(item.name)}
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
