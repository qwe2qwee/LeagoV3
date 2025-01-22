import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import { getColorHashCode, icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/store/useAuthStore";
import ParallaxScrollView from "@/components/ParallaxScrollView";

interface CarDetails {
  name: { [key: string]: string };
  year?: number;
  color?: string;
  mileage?: number;
}

interface RentSalary {
  daily?: { price: number };
}

const CarDetailsPage: React.FC = () => {
  const {
    carId,
    carDetails,
    carName,
    carRentSalary,
    carImages,
    ownerId,
    carImage,
    carCity,
  } = useLocalSearchParams();
  const router = useRouter();
  const bookingTime = "Today, 01:00 PM - 02:00 PM";
  const { language = "en", user } = useAuthStore();
  const [likesCount, setLikesCount] = useState<number>(0);

  const translations = {
    en: {
      noImageAvailable: "No Image Available",
      bookingHours: "Booking Hours",
      carDetails: "Car Details",
      mileage: "Mileage",
      bookNow: "Book Now",
    },
    ar: {
      noImageAvailable: "لا توجد صورة متاحة",
      bookingHours: "ساعات الحجز",
      carDetails: "تفاصيل السيارة",
      mileage: "عدد الأميال",
      bookNow: "احجز الآن",
    },
  };

  const parseJSON = (data: any): any => {
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    }
    return data;
  };

  const parsedCarDetails: CarDetails = parseJSON(carDetails);
  const parsedRentSalary: RentSalary = parseJSON(carRentSalary);
  const imageUri: string | undefined = Array.isArray(parseJSON(carImages))
    ? parseJSON(carImages)[0]
    : carImage;

  const color = getColorHashCode(parsedCarDetails?.color as any);

  // useEffect(() => {
  //   const fetchLikes = async () => {
  //     try {
  //       if (carId) {
  //         const count = await getCarLikesCount(carId as string);
  //         setLikesCount(count);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching likes count:", error);
  //     }
  //   };

  //   fetchLikes();

  //   const documentSubscriptionPath = `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.likesCollectionId}.documents`;

  //   const unsubscribe = client.subscribe(
  //     [documentSubscriptionPath, "files"],
  //     (response: any) => {
  //       if (response.payload.$id === carId) {
  //         if (
  //           response.events.includes("database.documents.delete") ||
  //           response.events.includes("database.documents.create")
  //         ) {
  //           console.log("Document event detected:", response.events);
  //           fetchLikes();
  //         }
  //       }
  //       console.log("Subscription Response:", response); // Log specific response details for debugging
  //     }
  //   );

  //   return () => {
  //     if (unsubscribe) unsubscribe();
  //   };
  // }, [carId]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      <View className="relative items-center justify-center bg-[#F7F7F7] rounded-lg h-72 w-full">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="h-52 w-52 rounded-lg"
            resizeMode="contain"
          />
        ) : (
          <Text className="text-gray-500">
            {translations[language].noImageAvailable}
          </Text>
        )}
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
        </View>
      </View>

      <View className="p-3">
        <View className="flex-row justify-between mt-4">
          <Text className="text-2xl font-bold">
            {parsedCarDetails.name[language]}
          </Text>
          <Text className="text-xl text-black">
            ${parsedRentSalary?.daily?.price || "N/A"}/day
          </Text>
        </View>
        <View className="flex-row items-center justify-between my-3">
          <View className="flex-row items-center">
            <Image
              source={icons.point}
              className="w-5 h-5 mr-1"
              tintColor={"#9CA4AB"}
              resizeMode="contain"
            />
            <Text className="text-sm text-[#9CA4AB]">{carCity || "N/A"}</Text>
          </View>

          <Text className="text-sm text-[#9CA4AB] mt-2">
            {parsedCarDetails?.year || "N/A"} -{" "}
            <View
              className="w-5 h-2 rounded-full border-[1px] border-gray-300"
              style={{ backgroundColor: color }}
            ></View>
          </Text>
        </View>
        <View className="flex-col items-start my-3">
          <View className="flex-row items-center">
            <Image
              source={icons.Time}
              className="w-5 h-5 mr-1"
              tintColor={"#9CA4AB"}
              resizeMode="contain"
            />
            <Text className="text-sm text-[#9CA4AB]">
              {translations[language].bookingHours}
            </Text>
          </View>
          <View className="m-3 ml-6 border-dashed border-[#E2E3E8] border-2 p-1">
            <Text className="text-primary-400">{bookingTime}</Text>
          </View>
        </View>

        <View className="mt-4">
          <Text className="text-lg font-semibold">
            {translations[language].carDetails}
          </Text>
          <Text className="text-gray-600">
            {translations[language].mileage}:{" "}
            {parsedCarDetails?.mileage || "N/A"}
          </Text>
        </View>

        <CustomButton
          title={translations[language].bookNow}
          className="rounded-lg mt-6 p-4"
          onPress={() => {
            if (carId) {
              router.push({
                pathname: "/screens/Home/BookingPage",
                params: { carId, carRentSalary, ownerId },
              });
            } else {
              console.error("carId is missing.");
            }
          }}
        />
      </View>
    </ParallaxScrollView>
  );
};

export default CarDetailsPage;
