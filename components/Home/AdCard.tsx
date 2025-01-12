// File: components/AdCard.tsx
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

interface AdCardProps {
  title: string;
  uri: string;
}

const { width } = Dimensions.get("window");

const AdCard: React.FC<AdCardProps> = ({ title, uri }) => {
  return (
    <View
      className="bg-primary-400 rounded-lg overflow-hidden  mt-2shadow "
      style={{ width: width * 0.7, marginRight: 16 }} // Set width to 80% and added margin for spacing
    >
      <Image
        source={{
          uri: uri,
        }}
        className="h-[150px] w-full"
        resizeMode="contain"
      />
    </View>
  );
};

export default AdCard;
