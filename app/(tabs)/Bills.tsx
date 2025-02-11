import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ReservationsRelative } from "@/lib/appwrite/apit";
import useAuthStore from "@/store/useAuthStore";
import { ReservationInfo } from "@/types/AppwriteTypes";
import { cityTranslations, icons } from "@/constants";
import { router } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import CustombillBtton from "@/components/Bills/CustombillBtton";

const translations = {
  en: {
    loading: "Loading reservations...",
    noReservations: "No reservations found.",
    status: "Status:",
    details: "Details",
    bill: "/ bill",
    completed: "Completed",
    unknown: "Unknown",
    pending: "Pending",
    active: "Active",
  },
  ar: {
    loading: "جارٍ تحميل الحجوزات...",
    noReservations: "لا توجد حجوزات.",
    status: "الحالة:",
    details: "التفاصيل",
    bill: "/ الفاتورة",
    completed: "مكتمل",
    unknown: "غير معروف",
    pending: "قيد الانتظار",
    active: "نشط",
  },
};

const Bills = () => {
  const { user, language } = useAuthStore();
  const [reservations, setReservations] = useState<ReservationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const t = translations[language]; // Get translations based on the language

  const fetchReservations = async () => {
    try {
      if (user?.$id) {
        const unsubscribe = await ReservationsRelative(
          user.$id,
          setReservations
        );
        return unsubscribe; // Return the unsubscribe function for cleanup
      }
    } catch (error) {
      console.error("Failed to load reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let unsubscribeFn: (() => void) | undefined;

    fetchReservations().then((unsubscribe) => {
      unsubscribeFn = unsubscribe;
    });

    return () => {
      if (unsubscribeFn) {
        unsubscribeFn(); // Cleanup the subscription on unmount
      }
    };
  }, [user]);

  const translateCity = (
    city: string | undefined,
    language: "en" | "ar"
  ): string => {
    if (!city) return language === "ar" ? "غير معروف" : "Unknown";
    const translation = cityTranslations[city];
    return translation ? translation[language] : city;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Simulate a network request or refresh logic
      await fetchReservations();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setRefreshing(false);
    }
  };

  // Translate the status
  const translateStatus = (status: string) => {
    switch (status) {
      case "Completed":
        return t.completed;
      case "Unknown":
        return t.unknown;
      case "Pending":
        return t.pending;
      case "Active":
        return t.active;
      default:
        return t.unknown; // Default to "Unknown"
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    >
      {loading ? (
        <Text className="text-center mt-5">{t.loading}</Text>
      ) : reservations.length > 0 ? (
        reservations.map((reservation: any) => {
          return (
            <View
              key={reservation.id}
              className="mb-4 p-6 bg-[#F5F7FF] shadow mx-5 rounded-xl"
            >
              <View
                className="flex-row items-center justify-between mb-2"
                style={{
                  flexDirection: language === "en" ? "row-reverse" : "row", // RTL support
                }}
              >
                <Text
                  className={` text-lg font-semibold ${
                    language === "ar"
                      ? "font-MontserratBold text-right"
                      : "font-MontserratBold text-left"
                  } `}
                >
                  {reservation.carName}
                </Text>
                <Text
                  className={` text-sm text-[#868686] text-left ${
                    language === "ar" ? "font-Montserrat " : "font-Montserrat "
                  } `}
                >
                  {reservation.reservationDate}
                </Text>
              </View>

              <View
                className={` flex-row items-center gap-x-2 mb-2 `}
                style={{
                  flexDirection: language === "ar" ? "row" : "row-reverse", // RTL support
                  justifyContent: language === "ar" ? "flex-end" : "flex-start",
                }}
              >
                <Text className="text-sm font-MontserratMedium text-[#868686]">
                  {reservation.carYear || t.unknown}
                </Text>
                <View
                  className="flex-row justify-center items-center"
                  style={{
                    flexDirection: language === "ar" ? "row-reverse" : "row", // RTL support
                  }}
                >
                  <Image source={icons.point1} className="w-4 h-4 mx-1" />
                  <Text className="text-sm font-MontserratMedium text-[#868686]">
                    {translateCity(reservation.city, language) || "N/A"}
                  </Text>
                </View>
              </View>
              <Image
                source={{ uri: reservation.carImage } as any}
                resizeMode="contain"
                className="w-full h-36 rounded-lg"
              />
              <Text
                className={`text-sm ${
                  language === "ar"
                    ? "font-MontserratBold text-left"
                    : "font-MontserratBold text-left"
                } `}
              >
                {t.status} {translateStatus(reservation?.status)}
              </Text>
              <View className="flex-row-reverse items-center justify-between mt-2">
                <CustombillBtton
                  title={t.details}
                  onPress={() => {
                    router.push({
                      pathname: "/screens/Bills/DetailsBill",
                      params: { reservation: JSON.stringify(reservation) },
                    });
                  }}
                  className={`w-20 h-11 p-1 rounded-md ${
                    language === "ar"
                      ? "font-MontserratBold text-left"
                      : "font-MontserratBold text-left"
                  } `}
                  textStyle="text-[12px]"
                />
                <Text
                  className={`font-semibold ${
                    language === "ar"
                      ? "font-MontserratBold text-right"
                      : "font-MontserratBold text-left"
                  } `}
                >
                  {reservation.bill} {t.bill}
                </Text>
              </View>
            </View>
          );
        })
      ) : (
        <Text className="text-center mt-5">{t.noReservations}</Text>
      )}
    </ParallaxScrollView>
  );
};

export default Bills;
