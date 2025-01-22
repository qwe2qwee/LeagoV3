import { useCallback, useEffect, useMemo, useState } from "react";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import AdCardSection from "@/components/Home/AdCardSection";
import { CarDocument } from "@/types/AppwriteTypes";
import useAuthStore from "@/store/useAuthStore";
import { listCars, parseCarLocation } from "@/lib/appwrite/apit";
import CarFilter from "@/components/Home/CarFilter";
import CarGrid from "@/components/Home/CarGrid";

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

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
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

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Simulate a network request or refresh logic
      await onRefresh();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f3f4f6", dark: "#f3f4f6" }}
      headerImage={<AdCardSection />}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    >
      {/* Additional content can go here */}
      <CarFilter
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
      />

      {/* Car Grid Section */}
      <CarGrid
        cars={cars}
        userLocation={userLocation}
        selectedBrand={selectedBrand}
        language={language}
      />
    </ParallaxScrollView>
  );
}
