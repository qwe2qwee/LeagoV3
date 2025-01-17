import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { parseCarLocation, ReservationsRelative } from "@/lib/appwrite/apit";
import useAuthStore from "@/store/useAuthStore";
import { ReservationInfo } from "@/types/AppwriteTypes";
import { icons } from "@/constants";
import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";

// Utility to calculate the distance between two locations
const calculateDistanceInKm = (
  loc1: { lat: number; lon: number },
  loc2: { lat: number; lon: number }
): number => {
  if (!loc1 || !loc2) return 0;
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lon - loc1.lon);
  const lat1 = toRad(loc1.lat);
  const lat2 = toRad(loc2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1)); // Distance rounded to 1 decimal place
};

const Bills = () => {
  const { user, latitude, longitude } = useAuthStore();
  const [reservations, setReservations] = useState<ReservationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 98, paddingTop: 9 }}>
        {loading ? (
          <Text className="text-center mt-5">Loading reservations...</Text>
        ) : reservations.length > 0 ? (
          reservations.map((reservation) => {
            const carLocation = parseCarLocation(
              reservation.carLocation as any
            );
            const userLocation = { lat: latitude, lon: longitude };
            const distance = calculateDistanceInKm(
              userLocation as any,
              carLocation as any
            );

            return (
              <View
                key={reservation.id}
                className="mb-4 p-6 bg-[#F5F7FF] shadow mx-5 rounded-xl"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-lg font-semibold ">
                    {reservation.carName}
                  </Text>
                  <Text className="text-sm font-MontserratMedium text-[#868686]">
                    {reservation.reservationDate}
                  </Text>
                </View>
                <View className="flex-row items-center gap-x-2 mb-2">
                  <Text className="text-sm font-MontserratMedium text-[#868686]">
                    {reservation.carYear || "Unknown"}
                  </Text>
                  <View className="flex-row justify-center items-center">
                    <Image source={icons.point1} className="w-4 h-4 mx-1" />
                    <Text className="text-sm font-MontserratMedium text-[#868686]">
                      {reservation.city || "N/A"}
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: reservation.carImage } as any}
                  resizeMode="contain"
                  className="w-full h-36 rounded-lg"
                />
                {/* <Text className="text-sm">
                  Start:{" "}
                  {new Date(reservation.reservationStart).toLocaleString()}
                </Text>
                <Text className="text-sm">
                  End: {new Date(reservation.reservationEnd).toLocaleString()}
                </Text> */}
                <Text className="text-sm">Status: {reservation.payStatus}</Text>
                <View className="flex-row-reverse items-center justify-between mt-2">
                  <CustomButton
                    title="Details"
                    onPress={() => {
                      router.push({
                        pathname: "/screens/Bills/DetailsBill",
                        params: { reservation: JSON.stringify(reservation) },
                      });
                    }}
                    className="w-28 h-9 p-1 rounded-md"
                    textStyle="text-[13px]"
                  />
                  <Text>{reservation.bill} / 3 Hours </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text className="text-center mt-5">No reservations found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bills;
