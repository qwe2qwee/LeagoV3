import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import { icons } from "@/constants";

// Localization support
const translations = {
  en: {
    noDetails: "Reservation details not found.",
    goBack: "Go Back",
    carName: "Car Name",
    year: "Year",
    city: "City",
    status: "Status",
    reservationDate: "Reservation Date",
    start: "Start",
    end: "End",
    backToBills: "Back to Bills",
    unknown: "Unknown",
    na: "N/A",
  },
  ar: {
    noDetails: "تفاصيل الحجز غير موجودة.",
    goBack: "العودة",
    carName: "اسم السيارة",
    year: "السنة",
    city: "المدينة",
    status: "الحالة",
    reservationDate: "تاريخ الحجز",
    start: "بداية",
    end: "نهاية",
    backToBills: "العودة إلى الفواتير",
    unknown: "غير معروف",
    na: "غير متوفر",
  },
};

// Set the desired locale
const locale = "ar"; // Change to "en" for English
const t = translations[locale];

const DetailsBill = () => {
  const { reservation: reservationString } = useLocalSearchParams(); // Get the serialized reservation
  const router = useRouter();

  // Parse the reservation JSON string into an object
  const reservation = reservationString ? JSON.parse(reservationString) : null;

  if (!reservation) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>{t.noDetails}</Text>
        <CustomButton title={t.goBack} onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 90 }}>
        <View className="absolute top-2 left-2 right-2 flex-row justify-between p-2 z-10">
          <Pressable
            onPress={() => router.back()}
            className="bg-white rounded-full p-3 shadow-md"
          >
            <Image
              source={icons.backArrow}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </Pressable>
          <Pressable
            className="bg-white rounded-full p-3  relative w-12 h-12"
            style={{
              shadowColor: "#000", // iOS shadow color
              shadowOffset: { width: 0, height: -2 }, // iOS shadow offset
              shadowOpacity: 0.1, // iOS shadow opacity
              shadowRadius: 3, // iOS shadow radius
              elevation: 3, // Android elevation
            }}
          >
            <View className="flex items-center justify-center">
              <Image
                source={icons.Danger}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </View>
          </Pressable>
        </View>
        <Text className="text-lg font-bold mb-4 text-right">
          {reservation.carName}:رقم الطلب
        </Text>
        <Text className="text-sm mb-2">
          {t.year}: {reservation.carYear || t.unknown}
        </Text>
        <Text className="text-sm mb-2">
          {t.city}: {reservation.city || t.unknown}
        </Text>
        <Text className="text-sm mb-2">
          {t.status}: {reservation.status || t.na}
        </Text>
        <Text className="text-sm mb-2">
          {t.reservationDate}: {reservation.reservationDate || t.na}
        </Text>
        <Text className="text-sm mb-2">
          {t.start}:{" "}
          {reservation.reservationStart
            ? new Date(reservation.reservationStart).toLocaleString(locale)
            : t.na}
        </Text>
        <Text className="text-sm mb-4 ">
          {t.end}:{" "}
          {reservation.reservationEnd
            ? new Date(reservation.reservationEnd).toLocaleString(locale)
            : t.na}
        </Text>
        <View className="w-full h-[1px] bg-textColor-200"></View>
      </ScrollView>
      <View
        className="absolute bottom-0 w-full items-center justify-center py-4 bg-white"
        style={{
          shadowColor: "#000", // iOS shadow color
          shadowOffset: { width: 0, height: -2 }, // iOS shadow offset
          shadowOpacity: 0.1, // iOS shadow opacity
          shadowRadius: 3, // iOS shadow radius
          elevation: 5, // Android elevation
        }}
      >
        <CustomButton
          title={t.backToBills}
          onPress={() => router.push("/screens/Bills")}
          className="w-3/4 h-12"
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailsBill;
