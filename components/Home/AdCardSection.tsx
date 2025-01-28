// File: components/AdCardSection.tsx
import React, { useEffect, useState } from "react";
import { FlatList, Dimensions } from "react-native";
import AdCard from "./AdCard";
import { appwriteConfig, databases } from "@/lib/appwrite/config";

const { width } = Dimensions.get("window");

const AdCardSection: React.FC = () => {
  const [adData, setAds] = useState<any[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await databases.listDocuments(
          appwriteConfig.databaseId as string,
          appwriteConfig.cardsCol as string
        );
        setAds(response.documents);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);
  return (
    <FlatList
      data={adData}
      horizontal
      style={{ height: 200, marginVertical: "auto" }} // Added margin to the container
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
