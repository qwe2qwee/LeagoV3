import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CarDocument } from "@/types/AppwriteTypes";
import useAuthStore from "@/store/useAuthStore";
import {
  parseCarLocation,
  parseDetails,
  listCars,
  searchCars,
} from "@/lib/appwrite/apit";
import { getColorHashCode, icons } from "@/constants";
import SearchBar from "@/components/Search/SearchBar";
import {
  findBrandByPartialModel,
  getEnglishModelName,
} from "@/constants/modelToBrandMap";

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
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [isEndReached, setIsEndReached] = useState(true);
  const { latitude, longitude } = useAuthStore();
  const LIMIT = 2;
  let debounceTimeout: any;

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

  // Trigger search on button press
  const handleSearch = () => {
    setCars([]);
    fetchCars(true); // Reset and search with current query
  };
  const renderItem = ({ item }: any) => {
    const carInfo = parseDetails(item.details)?.[0];
    if (!carInfo) return null;

    const color = getColorHashCode(carInfo.color || "unknown");
    const distanceText =
      item.distance > 100 ? `${item.city || "N/A"}` : `${item.distance} km`; // Display city if distance > 100 km
    return (
      <TouchableOpacity
        className="flex-row w-auto h-28 bg-white m-2 p-2 px-3 rounded-lg shadow-md"
        onPress={() => {
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
        }}
      >
        <View className="items-center justify-center bg-[#EBEBEF] p-2 mr-4 rounded-xl">
          <Image
            source={{ uri: carInfo.image }}
            resizeMode="contain"
            className="h-20 w-20 rounded-lg "
          />
        </View>

        <View className="flex-1 justify-between flex-row items-center ">
          <View className="flex-col h-4/5 justify-between">
            <Text className="text-lg font-bold">
              {carInfo.name?.ar || "N/A"}
            </Text>
            <View>
              <View
                className={`w-3 h-3 rounded-full border border-gray-400 my-1`}
                style={{ backgroundColor: color }}
              ></View>
              <Text className="text-gray-600">{carInfo.year || "N/A"}</Text>
            </View>
          </View>
          <View className="flex-col justify-between items-end h-4/5">
            <View className="flex-row-reverse justify-center items-center">
              <Image source={icons.point1} className="w-4 h-4" />
              <Text className="text-[#868686] text-sm">{distanceText}</Text>
            </View>
            <View className="">
              <Text className="text-green-600">
                {carInfo.rentType?.monthly?.price || "N/A"}/month
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        onEndReached={() => fetchCars()}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        style={{ marginBottom: 99, paddingTop: 9 }}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#000" /> : null
        }
        ListEmptyComponent={() =>
          !loading && (
            <Text className="text-center mt-5 text-gray-600">
              No cars available
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
