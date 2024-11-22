import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdCardSection from "@/components/Home/AdCardSection";
import CarFilter from "@/components/Home/CarFilter";
import CarGrid from "@/components/Home/CarGrid";
import useAuthStore from "@/store/useAuthStore";
import { listCars, parseCarLocation } from "@/lib/appwrite/apit";
import { CarDocument } from "@/types/AppwriteTypes";

const defaultLocation = { lat: 21.543333, lon: 39.172778 }; // Coordinates for Jeddah, SA

const calculateDistance = (
  loc1: { lat: number | null; lon: number | null },
  loc2: { lat: number; lon: number }
): number => {
  const safeLoc1 = {
    lat: loc1.lat ?? defaultLocation.lat,
    lon: loc1.lon ?? defaultLocation.lon,
  };

  return Math.sqrt(
    Math.pow(loc2.lat - safeLoc1.lat, 2) + Math.pow(loc2.lon - safeLoc1.lon, 2)
  );
};

const Home: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const { language, user, latitude, longitude } = useAuthStore();
  const [cars, setCars] = useState<CarDocument[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const userLocation = useMemo(
    () => ({ lat: latitude, lon: longitude }),
    [latitude, longitude]
  );

  const fetchAndFilterCars = useCallback(
    async (reset: boolean = false) => {
      if (reset) {
        setIsRefreshing(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const currentPage = reset ? 1 : page;
        const offset = (currentPage - 1) * 2; // Adjust offset dynamically

        const fetchedCars = await listCars({
          queries: [],
          lang: language,
          limit: 200,
          offset,
        });

        let filteredList = fetchedCars.filter((car) => !car.isHidden);

        if (selectedBrand) {
          filteredList = filteredList.filter(
            (car) => car.brand === selectedBrand
          );
        }

        filteredList.sort((a, b) => {
          const carLocationA = parseCarLocation(a.carLocation as any);
          const carLocationB = parseCarLocation(b.carLocation as any);
          if (!carLocationA || !carLocationB) return 0;

          const distanceA = calculateDistance(userLocation, carLocationA);
          const distanceB = calculateDistance(userLocation, carLocationB);
          return distanceA - distanceB;
        });

        setCars((prevCars: any) => {
          const newCars = reset ? filteredList : [...prevCars, ...filteredList];

          // Remove duplicates based on `$id`
          return Array.from(
            new Map(newCars.map((car) => [car.$id, car])).values()
          );
        });

        setPage((prevPage) => (reset ? 2 : prevPage + 1)); // Reset to page 2 after refresh
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setIsRefreshing(false);
        setIsLoadingMore(false);
      }
    },
    [language, page, selectedBrand, userLocation]
  );

  useEffect(() => {
    fetchAndFilterCars(true);
  }, [selectedBrand, userLocation, user?.$id]);

  const onRefresh = () => fetchAndFilterCars(true);

  const handleScroll = useCallback(
    (event: any) => {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;

      // Check if the user has scrolled to within 50px of the bottom
      const isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

      if (isCloseToBottom && !isLoadingMore) {
        fetchAndFilterCars(); // Load more items
      }
    },
    [fetchAndFilterCars, isLoadingMore]
  );

  return (
    <SafeAreaView className="flex-1 rt bg-gray-100">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 98, paddingTop: 9 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
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
          cars={cars}
          userLocation={userLocation}
          selectedBrand={selectedBrand}
          language={language}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
