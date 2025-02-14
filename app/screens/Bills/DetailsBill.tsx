import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import { icons } from "@/constants";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { appwriteConfig } from "@/lib/appwrite/config";
import useAuthStore from "@/store/useAuthStore";

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
    backToBills: "Pay",
    unknown: "Unknown",
    na: "N/A",
    mapError: "Failed to load map",
    invalidCoordinates: "Invalid coordinates",
    openMap: "Open in Maps",
    rciptNumber: "Receipt Number",
  },
  ar: {
    noDetails: "تفاصيل الحجز غير موجودة.",
    goBack: "العودة",
    carName: "اسم السيارة",
    year: "السنة",
    city: "المدينة",
    status: "الحالة",
    reservationDate: "بداية الحجز",
    start: "بداية",
    end: "نهاية",
    backToBills: "الدفع",
    unknown: "غير معروف",
    na: "غير متوفر",
    mapError: "فشل تحميل الخريطة",
    invalidCoordinates: "إحداثيات غير صالحة",
    openMap: "فتح الخريطة",
    rciptNumber: " رقم الفاتورة",
  },
};

// Set the desired locale

const formatDateLocalized = (isoDate: string, locale: "ar" | "en"): string => {
  try {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    console.error("Invalid date format:", isoDate);
    return locale === "ar" ? "تاريخ غير صالح" : "Invalid Date";
  }
};

const isValidCoordinate = (num: number) =>
  !isNaN(num) && num >= -180 && num <= 180;

const DetailsBill = () => {
  const { reservation: reservationString } = useLocalSearchParams();
  const { language } = useAuthStore();
  const t = translations[language];

  const router = useRouter();

  const reservation = reservationString
    ? JSON.parse(reservationString as any)
    : null;

  const defaultLocation = { lat: 21.543333, lon: 39.172778 };

  const handleMapPress = () => {
    const lat = Number(reservation?.carLocation?.lat) || defaultLocation.lat;
    const lon = Number(reservation?.carLocation?.lon) || defaultLocation.lon;

    if (!isValidCoordinate(lat) || !isValidCoordinate(lon)) {
      Alert.alert(t.invalidCoordinates);
      return;
    }

    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${lon}`,
      android: `https://www.google.com/maps?q=${lat},${lon}`,
    });

    Linking.openURL(url!).catch(() => Alert.alert(t.mapError));
  };

  if (!reservation) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>{t.noDetails}</Text>
        <CustomButton title={t.goBack} onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 90 }}>
        {/* Header Buttons */}
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
            className="bg-white rounded-full p-3 relative w-12 h-12"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
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

        {/* Reservation Details */}
        <Text
          className={`mb-4  ${
            language === "ar"
              ? "font-ZainMedium text-right"
              : "font-Montserrat text-left"
          } `}
        >
          {t.rciptNumber} :{" "}
          {reservation.payId ? reservation.payId : reservation.carName}
        </Text>
        <Text
          className={`mb-4  ${
            language === "ar"
              ? "font-ZainMedium text-right"
              : "font-Montserrat text-left"
          } `}
        >
          {t.year}: {reservation.carYear || t.unknown}
        </Text>
        <Text
          className={`mb-4  ${
            language === "ar"
              ? "font-ZainMedium text-right"
              : "font-Montserrat text-left"
          } `}
        >
          {t.city}: {reservation.city || t.unknown}
        </Text>
        <Text
          className={`mb-4  ${
            language === "ar"
              ? "font-ZainMedium text-right"
              : "font-Montserrat text-left"
          } `}
        >
          {t.status}: {reservation.status || t.na}
        </Text>
        <Text
          className={`mb-4  ${
            language === "ar"
              ? "font-ZainMedium text-right"
              : "font-Montserrat text-left"
          } `}
        >
          {t.reservationDate}: {reservation.reservationDate || t.na}
        </Text>
        <Text
          className={`mb-4  ${
            language === "ar"
              ? "font-ZainMedium text-right"
              : "font-Montserrat text-left"
          } `}
        >
          {t.start}:{" "}
          {reservation.reservationStart
            ? formatDateLocalized(reservation.reservationStart, "ar")
            : t.na}
        </Text>
        <Text
          className={`mb-4  ${
            language === "ar"
              ? "font-ZainMedium text-right"
              : "font-Montserrat text-left"
          } `}
        >
          {t.end}:{" "}
          {reservation.reservationEnd
            ? formatDateLocalized(reservation.reservationEnd, "ar")
            : t.na}
        </Text>
        <View className="w-full h-[1px] bg-textColor-200"></View>

        {/* Map Section */}
        <View className="items-center justify-center mt-4 h-40 w-full">
          <View className="h-40 w-full">
            {reservation?.carLocation &&
            reservation.payStatus === "Completed" ? (
              <Pressable
                onPress={handleMapPress}
                className="h-full w-full rounded-lg overflow-hidden"
              >
                <Image
                  source={{
                    uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${
                      Number(reservation?.carLocation?.lon) ||
                      defaultLocation.lon
                    },${
                      Number(reservation?.carLocation?.lat) ||
                      defaultLocation.lat
                    }&zoom=14&apiKey=${
                      appwriteConfig.EXPO_PUBLIC_GEOAPIFY_API_KEY
                    }`,
                  }}
                  className="h-full w-full rounded-lg"
                  onError={() => Alert.alert(t.mapError)}
                  defaultSource={icons.fallbackMap}
                />
                <View className="absolute inset-0 items-center justify-center bg-black/10">
                  <Text className="text-white font-bold text-lg">
                    {t.openMap}
                  </Text>
                </View>
              </Pressable>
            ) : (
              <View className="items-center justify-center h-full w-full bg-gray-200 rounded-lg">
                <Text
                  className={`mb-4 text-center  ${
                    language === "ar" ? "font-ZainMedium" : "font-Montserrat "
                  } `}
                >
                  {t.noDetails}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Payment Button */}
      <View className="absolute bottom-0 left-0 right-0  w-full items-center justify-center py-4 px-5">
        <CustomButton
          title={t.backToBills}
          onPress={() => {
            router.push({
              pathname: "/screens/Bills/PaymentScreen",
              params: {
                total: reservation.bill,
                reservationId: reservation.id,
              },
            });
          }}
          className="w-3/5 h-14 "
        />
      </View>
    </ParallaxScrollView>
  );
};

export default DetailsBill;
