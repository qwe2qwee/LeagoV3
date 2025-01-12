// File: components/AdCardSection.tsx
import React from "react";
import { FlatList, Dimensions } from "react-native";
import AdCard from "./AdCard";

const adData = [
  {
    id: "1",
    title: "Special Offer 1",
    uri: "https://www.assayyarat.com/wp-content/uploads/2020/11/EmLKnaGWkAwtfv0.jpg",
  },
  {
    id: "2",
    title: "Special Offer 2",
    uri: "https://th.bing.com/th/id/OIP.Cy262jKs-yVdJJDEnv5EAgHaHa?w=1080&h=1080&rs=1&pid=ImgDetMain",
  },
];

const { width } = Dimensions.get("window");

const AdCardSection: React.FC = () => {
  return (
    <FlatList
      data={adData}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AdCard title={item.title} uri={item.uri} />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8 }} // Added smaller padding to container
      snapToAlignment="start" // Makes sure the cards snap to the start while scrolling
      decelerationRate="fast" // Enables smoother scrolling experience
      snapToInterval={width * 0.8 + 16} // Auto-scroll for 80% width cards + margin
    />
  );
};

export default AdCardSection;
