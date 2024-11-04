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
import { parseCarLocation, parseDetails, listCars } from "@/lib/appwrite/apit";
import { CarDocument } from "@/types/AppwriteTypes";
import { router } from "expo-router";
import { getColorHashCode } from "@/constants";

interface CarGridProps {
  selectedBrand: string | null;
  userLocation: { lat: number; lon: number };
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
  loc1: { lat: number; lon: number },
  loc2: { lat: number; lon: number }
): number => {
  return Math.sqrt(
    Math.pow(loc2.lat - loc1.lat, 2) + Math.pow(loc2.lon - loc1.lon, 2)
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
          const carLocationA = parseCarLocation(JSON.stringify(a.carLocation));
          const carLocationB = parseCarLocation(b.carLocation);

          if (!carLocationA || !carLocationB) return 0;

          const distanceA = calculateDistance(userLocation, carLocationA);
          const distanceB = calculateDistance(userLocation, carLocationB);
          return distanceA - distanceB;
        });

        setFilteredCars(filteredList);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchAndFilterCars();
  }, [selectedBrand, userLocation]);

  const toggleLike = (carId: string) => {
    setLikedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  const renderItem = ({ item }: { item: CarDocument }) => {
    const carDetails = Array.isArray(item.details)
      ? parseDetails(item.details)
      : [];
    if (!carDetails || carDetails.length === 0) return null;

    const carInfo = carDetails[0];

    let color = getColorHashCode(carInfo.color);

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
                carName: item.brand,
                carRentSalary: JSON.stringify(carInfo.rentType),
                carImages: JSON.stringify(carInfo.image),
                carImage: carInfo.image,
                ownerId: item.ownerId,
                carCity: item.city,
              },
            });
          } else {
            console.error("Incomplete car details");
          }
        }}
        style={[styles.cardContainer, { width: screenWidth * 0.45 }]}
      >
        <Image
          source={{ uri: carInfo.image }}
          style={styles.carImage}
          resizeMode="contain"
        />
        <View
          style={{
            display: "flex",
            direction: language === "ar" ? "rtl" : "ltr", // Sets text direction
            justifyContent: "space-between", // Example flex property
            alignItems: language === "ar" ? "flex-end" : "flex-start", // Example flex property
          }}
        >
          <Text style={styles.carBrand}>{carInfo.name[language]}</Text>
          <View
            style={{ backgroundColor: color }}
            className={`  w-2 h-2 rounded-full  border-[1px]`}
          ></View>
          <Text style={styles.carPrice}>
            {carInfo.rentType?.monthly?.price}
          </Text>
          <Text style={styles.carCity}>{`${city}: ${item.city}`}</Text>
          <Text style={styles.carYear}>{`${year}: ${carInfo.year}`}</Text>
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
  carColor: {
    fontSize: 12,
    color: "gray",
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
