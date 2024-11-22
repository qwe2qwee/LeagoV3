import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { getColorHashCode } from "@/constants";
import { CarDocument } from "@/types/AppwriteTypes";

interface CarGridItemProps {
  car: CarDocument;
  language: "en" | "ar";
}

const translations = {
  en: {
    city: "City",
    year: "Year",
    dailyRate: "/day",
  },
  ar: {
    city: "المدينة",
    year: "السنة",
    dailyRate: "/اليوم",
  },
};

const CarGridItem: React.FC<CarGridItemProps> = ({ car, language }) => {
  const carDetails =
    car?.details && Array.isArray(car?.details) ? car?.details[0] : null;
  const { city, year, dailyRate } = translations[language];

  if (!carDetails) {
    return null; // Skip rendering if details are missing
  }

  console.log("hhhhh");

  try {
    const color = getColorHashCode(carDetails?.color || "unknown");

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.cardContainer}
        onPress={() => {
          if (carDetails?.image && carDetails?.rentType) {
            router.push({
              pathname: "/screens/Home/CarDetailsPage",
              params: {
                carId: car?.$id,
                carDetails: JSON.stringify(carDetails),
                carName: car?.brand || "Unknown",
                carRentSalary: JSON.stringify(carDetails?.rentType),
                carImages: JSON.stringify(carDetails?.image),
                carImage: carDetails?.image,
                ownerId: car?.ownerId || "N/A",
                carCity: car?.city || "N/A",
              },
            });
          }
        }}
      >
        {/* Car Image */}
        {carDetails?.image ? (
          <Image
            source={{ uri: carDetails?.image }}
            style={styles.carImage}
            resizeMode="cover"
          />
        ) : null}

        {/* Car Info */}
        <View style={styles.infoContainer}>
          <Text style={styles?.carName}>{car?.brand || "Unknown"}</Text>
          <Text style={styles.carPrice}>
            {carDetails?.rentType?.monthly?.price
              ? `${carDetails?.rentType.monthly.price} ${dailyRate}`
              : "N/A"}
          </Text>

          {/* City and Year */}
          <View style={styles.row}>
            <Text
              style={styles.infoText}
            >{`${city}: ${car?.city || "N/A"}`}</Text>
            <Text style={styles.infoText}>{`${year}: ${
              carDetails?.year || "N/A"
            }`}</Text>
          </View>

          {/* Color Indicator */}
          <View style={[styles.colorIndicator, { backgroundColor: color }]} />
        </View>
      </TouchableOpacity>
    );
  } catch (error) {
    console.error("Error rendering CarGridItem:", error);
    return null;
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffffff",
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    width: Dimensions.get("window").width * 0.45,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carImage: {
    height: 120,
    width: "100%",
  },
  infoContainer: {
    padding: 12,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#757575",
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    alignSelf: "flex-start",
  },
});

export default CarGridItem;
