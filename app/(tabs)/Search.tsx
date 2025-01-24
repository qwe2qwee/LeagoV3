import React, { useEffect, useState } from "react";
import { FlatList, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import useAuthStore from "@/store/useAuthStore";
import {
  parseCarLocation,
  parseDetails,
  listCars,
  searchCars,
} from "@/lib/appwrite/apit";
import { getColorHashCode } from "@/constants";
import SearchBar from "@/components/Search/SearchBar";
import {
  findBrandByPartialModel,
  getEnglishModelName,
} from "@/constants/modelToBrandMap";
import CarList from "@/components/Search/carList";
import { useSearchStore } from "@/store/SearchState";
import ParallaxScrollView from "@/components/ParallaxScrollView";

// Function to calculate the distance in kilometers between two points
const calculateDistanceInKm = (loc1: any, loc2: any) => {
  const toRad = (value: any) => (value * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lon - loc1.lon);
  const lat1 = toRad(loc1.lat);
  const lat2 = toRad(loc2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1)); // Distance formatted to one decimal place
};

const Search = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { query, clearQuery } = useSearchStore();

  const [offset, setOffset] = useState(0);
  const [isEndReached, setIsEndReached] = useState(true);
  const { latitude, longitude, language } = useAuthStore();
  const LIMIT = 2;
  let debounceTimeout: any;

  const translations = {
    en: {
      search: "Search",
      clear: "Clear",
      noCarsAvailable: "No cars available",
      errorLoadingCars: "Error loading cars. Please try again.",
      distance: "{{distance}} km",
      city: "{{city}}",
    },
    ar: {
      search: "بحث",
      clear: "مسح",
      noCarsAvailable: "لا توجد سيارات متاحة",
      errorLoadingCars: "حدث خطأ أثناء تحميل السيارات. يرجى المحاولة مرة أخرى.",
      distance: "{{distance}} كم",
      city: "{{city}}",
    },
  };

  const t = translations[language];

  // Function to load all cars initially using listCars
  const loadAllCars = async () => {
    setLoading(true);
    try {
      let allCars = await listCars();
      // Filter out hidden cars
      allCars = allCars.filter((car) => !car.isHidden);

      // Calculate the distance for each car and add it to the car object
      const carsWithDistance = allCars.map((car) => ({
        ...car,
        distance: calculateDistanceInKm(
          { lat: latitude, lon: longitude },
          parseCarLocation(car.carLocation as any)
        ),
      }));

      // Sort cars by distance (ascending order)
      const sortedCars = carsWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      setCars(sortedCars);
    } catch (error) {
      console.error("Error loading all cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch cars based on search query using searchCars
  const fetchCars = async (reset = false) => {
    if (loading) return;
    if (reset) setIsEndReached(false);
    if (isEndReached) return;

    const model: any = findBrandByPartialModel(query);

    const mooo = getEnglishModelName(model.nameItself);

    setLoading(true);
    try {
      // Fetch cars based on query and pagination
      let fetchedCarsRaw = await searchCars(
        model?.brandName as any,
        reset ? 0 : offset,
        LIMIT
      );

      // Filter out cars that are hidden
      const fetchedCarss = fetchedCarsRaw.filter((car) => !car.isHidden);
      const fetchedCars = fetchedCarss.filter(
        (car: any) => car.details[0]?.name["en"] == mooo
      );

      if (fetchedCars.length === 0) {
        setIsEndReached(true);
      } else {
        // Calculate the distance for each car and sort by proximity
        const sortedCars = fetchedCars
          .map((car) => ({
            ...car,
            distance: calculateDistanceInKm(
              { lat: latitude, lon: longitude }, // user location
              parseCarLocation(car.carLocation as any)
            ),
          }))
          .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0)); // Sort by distance in ascending order

        // Update state with the sorted list
        setCars(reset ? sortedCars : [...cars, ...sortedCars]);
        setOffset(reset ? LIMIT : offset + LIMIT);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load to fetch all cars on first mount using listCars
  useEffect(() => {
    loadAllCars();
  }, []);

  const handleClear = async () => {
    clearQuery();
    setCars([]);
    await loadAllCars();
  };

  // Trigger search on button press
  const handleSearch = () => {
    setCars([]);
    fetchCars(true); // Reset and search with current query
  };
  const renderItem = ({ item }: any) => {
    const carInfo = parseDetails(item.details)?.[0];
    if (!carInfo) return null;
    const handlePress = () => {
      router.push({
        pathname: "/screens/Home/CarDetailsPage",
        params: {
          carId: item.$id,
          carDetails: JSON.stringify(carInfo),
          carName: item.brand || "Unknown",
          carImages: JSON.stringify(carInfo.image),
          carImage: carInfo.image,
          carCity: item.city || "N/A",
          carRentSalary: JSON.stringify(carInfo.rentType),
        },
      });
    };

    const color = getColorHashCode(carInfo.color || "unknown");
    const distanceText =
      item.distance > 100 ? `${item.city || "N/A"}` : `${item.distance} km`; // Display city if distance > 100 km
    return (
      <CarList
        carInfo={carInfo}
        distanceText={distanceText}
        color={color}
        handlePress={handlePress}
      />
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      <SearchBar
        handleSearch={handleSearch}
        loading={loading}
        isArabic={language === "ar"}
        reest={handleClear}
      />
      <FlatList
        data={cars}
        renderItem={renderItem}
        scrollEnabled={false}
        keyExtractor={(item) => item.$id}
        onEndReached={() => fetchCars()}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#000" /> : null
        }
        ListEmptyComponent={() =>
          !loading && (
            <Text className="text-center mt-5 text-gray-600">
              {t.noCarsAvailable}
            </Text>
          )
        }
      />
    </ParallaxScrollView>
  );
};

export default Search;
