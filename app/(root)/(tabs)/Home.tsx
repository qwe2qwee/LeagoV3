// File: Home.tsx
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdCardSection from "@/components/Home/AdCardSection";
import CarFilter from "@/components/Home/CarFilter";
import CarGrid from "@/components/Home/CarGrid";

const Home: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 rt bg-gray-100">
      <ScrollView contentContainerStyle={{ paddingBottom: 98, paddingTop: 9 }}>
        {/* Ad Card Section */}
        <AdCardSection />

        {/* Car Filter Section */}
        <View className="my-4 mx-4">
          <CarFilter
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
          />
        </View>

        {/* Car Grid Section */}
        <CarGrid
          userLocation={{ lat: 21.608616, lon: -320.815205 }}
          selectedBrand={selectedBrand}
          language="ar"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
