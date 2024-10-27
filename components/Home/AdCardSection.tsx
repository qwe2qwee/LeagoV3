// File: components/AdCardSection.tsx
import React from "react";
import { FlatList, Dimensions } from "react-native";
import AdCard from "./AdCard";

const adData = [
  { id: "1", title: "Special Offer 1" },
  { id: "2", title: "Special Offer 2" },
  { id: "3", title: "Special Offer 3" },
];

const { width } = Dimensions.get("window");

const AdCardSection: React.FC = () => {
  return (
    <FlatList
      data={adData}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AdCard title={item.title} />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8 }} // Added smaller padding to container
      snapToAlignment="start" // Makes sure the cards snap to the start while scrolling
      decelerationRate="fast" // Enables smoother scrolling experience
      snapToInterval={width * 0.8 + 16} // Auto-scroll for 80% width cards + margin
    />
  );
};

export default AdCardSection;
