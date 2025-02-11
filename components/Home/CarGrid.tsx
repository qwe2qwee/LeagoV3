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
import { parseDetails } from "@/lib/appwrite/apit";
import { CarDocument } from "@/types/AppwriteTypes";
import { router } from "expo-router";
import { cityTranslations, getColorHashCode } from "@/constants";
import AvailableRentType from "../ui/AvailableRentType";
import useCarStore from "@/store/CarStore";

interface CarGridProps {
  selectedBrand: string | null;
  userLocation: { lat: number | null; lon: number | null };
  isLoadingMore: boolean;
  isRefreshing: boolean;
  language: "en" | "ar";
  cars: CarDocument[];
  isLoading: boolean;
}

const translations = {
  en: {
    city: "City",
    year: "Year",
    dailyRate: "/day",
    noCarsAvailable: "No cars available",
    loading: "Loading cars...",
  },
  ar: {
    city: "المدينة",
    year: "السنة",
    dailyRate: "/اليوم",
    noCarsAvailable: "لا توجد سيارات متاحة",
    loading: "جاري تحميل السيارات...",
  },
};

const translationss = {
  en: {
    daily: "daily",
    weekly: "weekly",
    monthly: "monthly",
    notAvailable: "Not Available",
    n: "N/A",
  },
  ar: {
    daily: "يومي",
    weekly: "أسبوعي",
    monthly: "شهري",
    notAvailable: "غير متوفر",
    n: "غير متاح",
  },
} as any;

const translateCity = (
  city: string | undefined,
  language: "en" | "ar"
): string => {
  if (!city) return language === "ar" ? "غير معروف" : "Unknown";
  const translation = cityTranslations[city];
  return translation ? translation[language] : city;
};

const CarGrid: React.FC<CarGridProps> = ({ language, cars, isLoading }) => {
  const screenWidth = Dimensions.get("window").width;
  const { city, year, noCarsAvailable, loading } = translations[language];
  const t = translationss[language];

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
            useCarStore.getState().setCarParams({
              carId: item?.$id,
              carDetails: carInfo,
              carName: item.brand ?? "Unknown",
              carRentSalary: carInfo.rentType,
              carImages: carInfo.image,
              carImage: carInfo.image, // Assuming this is the main image
              ownerId: item.ownerId ?? "N/A",
              carCity: item.city ?? "N/A",
            });
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
            justifyContent: "space-between",
          }}
        >
          <Text
            className={`${
              language === "ar"
                ? "font-ZainBold text-right"
                : "font-MontserratBold text-left"
            } `}
            style={styles.carBrand}
          >
            {carInfo.name[language] ?? "N/A"}
          </Text>

          <View
            style={{ backgroundColor: color }}
            className={`w-2 h-2 rounded-full border-[1px] ${
              language === "ar" ? "ml-auto" : "mr-auto"
            }`}
          ></View>

          <AvailableRentType
            rentType={carInfo.rentType}
            containerStyle={{ marginVertical: 1 }}
            textStyle={{ fontSize: 14 }}
          />

          <Text
            className={`${
              language === "ar"
                ? "font-ZainBold text-right"
                : "font-MontserratMedium text-left"
            }`}
            style={styles.carCity}
          >
            {`${city}: ${translateCity(item.city, language)}`}
          </Text>

          <Text
            className={`${
              language === "ar"
                ? "font-ZainBold text-right"
                : "font-Montserrat text-left"
            }`}
            style={styles.carYear}
          >
            {`${year}: ${carInfo.year ?? "N/A"}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text
          className={`${
            language === "ar"
              ? "font-ZainMedium text-right"
              : "font-MontserratMedium text-left"
          }`}
          style={styles.loadingText}
        >
          {loading}
        </Text>
      </View>
    );
  }

  if (cars.length === 0) {
    return (
      <Text
        className={`${
          language === "ar"
            ? "font-ZainBold text-right"
            : "font-MontserratBold text-left"
        }`}
        style={styles.noCarsText}
      >
        {noCarsAvailable}
      </Text>
    );
  }

  return (
    <FlatList
      data={cars}
      scrollEnabled={false}
      numColumns={2}
      keyExtractor={(item) => item.$id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  // Keep all your existing styles the same
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
    marginTop: 8,
  },
  carPrice: {
    fontSize: 14,
    color: "green",
  },
  carCity: {
    fontSize: 12,
    color: "gray",
    marginVertical: 1,
  },
  carYear: {
    fontSize: 12,
    color: "gray",
    marginVertical: 1,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
});

export default CarGrid;
