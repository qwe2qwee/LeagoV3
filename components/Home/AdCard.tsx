// File: components/AdCard.tsx
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

interface AdCardProps {
  title: string;
}

const { width } = Dimensions.get("window");

const AdCard: React.FC<AdCardProps> = ({ title }) => {
  return (
    <View
      className="bg-primary-400 rounded-lg overflow-hidden  mt-2shadow"
      style={{ width: width * 0.8, marginRight: 16 }} // Set width to 80% and added margin for spacing
    >
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        className="h-24 w-full"
      />
      <Text className="px-4 py-2 text-lg font-bold">{title}</Text>
    </View>
  );
};

export default AdCard;
