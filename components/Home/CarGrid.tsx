import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  parseCarLocation,
  parseDetails,
  listCars,
  likeCar,
  hasUserLikedCar,
} from "@/lib/appwrite/apit";
import { CarDocument } from "@/types/AppwriteTypes";
import { router } from "expo-router";
import { getColorHashCode } from "@/constants";
import useAuthStore from "@/store/useAuthStore";

const defaultLocation = { lat: 21.543333, lon: 39.172778 }; // Coordinates for Jeddah, SA

interface CarGridProps {
  selectedBrand: string | null;
  userLocation: { lat: number | null; lon: number | null };
  language: "en" | "ar";
}

const translations = {
  en: {
    city: "City",
    year: "Year",
    dailyRate: "/day",
    noCarsAvailable: "No cars available",
  },
  ar: {
    city: "المدينة",
    year: "السنة",
    dailyRate: "/اليوم",
    noCarsAvailable: "لا توجد سيارات متاحة",
  },
};

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

const CarGrid: React.FC<CarGridProps> = ({
  selectedBrand,
  userLocation,
  language,
}) => {
  const [filteredCars, setFilteredCars] = useState<CarDocument[]>([]);
  const [likedCars, setLikedCars] = useState<string[]>([]);
  const screenWidth = Dimensions.get("window").width;
  const { city, year, noCarsAvailable } = translations[language];
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchAndFilterCars = async () => {
      try {
        const cars = await listCars();
        let filteredList = cars.filter((car: any) => !car.isHidden);

        if (selectedBrand) {
          filteredList = filteredList.filter(
            (car: any) => car.brand === selectedBrand
          );
        }

        filteredList.sort((a: any, b: any) => {
          const carLocationA = parseCarLocation(a.carLocation);
          const carLocationB = parseCarLocation(b.carLocation);
          if (!carLocationA || !carLocationB) return 0;

          const distanceA = calculateDistance(userLocation, carLocationA);
          const distanceB = calculateDistance(userLocation, carLocationB);
          return distanceA - distanceB;
        });

        setFilteredCars(filteredList);

        // Check liked status for each car
        const likedStatusPromises = filteredList.map(async (car: any) => {
          const liked = await hasUserLikedCar(user?.$id ?? "", car.$id);
          return liked ? car.$id : null;
        });
        const likedResults = await Promise.all(likedStatusPromises);
        setLikedCars(likedResults.filter((id) => id !== null) as string[]);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchAndFilterCars();
  }, [selectedBrand, userLocation, user?.$id]);

  const toggleLike = async (carId: string) => {
    if (!user?.$id) {
      console.error("User not authenticated.");
      return;
    }

    try {
      await likeCar(user.$id, carId);
      setLikedCars((prev) =>
        prev.includes(carId)
          ? prev.filter((id) => id !== carId)
          : [...prev, carId]
      );
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  const renderItem = ({ item }: { item: CarDocument }) => {
    const carDetails = Array.isArray(item.details)
      ? parseDetails(item.details)
      : [];
    if (!carDetails || carDetails.length === 0) return null;

    const carInfo = carDetails[0];
    let color = getColorHashCode(carInfo.color ?? "unknown");

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (carInfo.image && carInfo.rentType) {
            router.push({
              pathname: "/screens/Home/CarDetailsPage",
              params: {
                carId: item?.$id,
                carDetails: JSON.stringify(carInfo),
                carName: item.brand ?? "Unknown",
                carRentSalary: JSON.stringify(carInfo.rentType),
                carImages: JSON.stringify(carInfo.image),
                carImage: carInfo.image,
                ownerId: item.ownerId ?? "N/A",
                carCity: item.city ?? "N/A",
              },
            });
          } else {
            console.error("Incomplete car details");
          }
        }}
        style={[styles.cardContainer, { width: screenWidth * 0.45 }]}
      >
        <Image
          source={{ uri: carInfo.image ?? "" }}
          style={styles.carImage}
          resizeMode="contain"
        />
        <View
          style={{
            display: "flex",
            direction: language === "ar" ? "rtl" : "ltr",
            justifyContent: "space-between",
            alignItems: language === "ar" ? "flex-end" : "flex-start",
          }}
        >
          <Text style={styles.carBrand}>{carInfo.name[language] ?? "N/A"}</Text>
          <View
            style={{ backgroundColor: color }}
            className={`w-2 h-2 rounded-full border-[1px]`}
          ></View>
          <Text style={styles.carPrice}>
            {carInfo.rentType?.monthly?.price ?? "N/A"}
          </Text>
          <Text style={styles.carCity}>{`${city}: ${item.city ?? "N/A"}`}</Text>
          <Text
            style={styles.carYear}
          >{`${year}: ${carInfo.year ?? "N/A"}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleLike(item.$id)}
          style={styles.likeIcon}
        >
          <Icon
            name={likedCars.includes(item.$id) ? "heart" : "heart-o"}
            size={24}
            color={likedCars.includes(item.$id) ? "red" : "gray"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (filteredCars.length === 0) {
    return <Text style={styles.noCarsText}>{noCarsAvailable}</Text>;
  }

  return (
    <FlatList
      data={filteredCars}
      scrollEnabled={false}
      numColumns={2}
      keyExtractor={(item) => item.$id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    margin: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "relative",
  },
  carImage: {
    height: 96,
    width: "100%",
    borderRadius: 8,
  },
  carBrand: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  carPrice: {
    fontSize: 14,
    color: "green",
  },
  carCity: {
    fontSize: 12,
    color: "gray",
  },
  carYear: {
    fontSize: 12,
    color: "gray",
  },
  likeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  noCarsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default CarGrid;
