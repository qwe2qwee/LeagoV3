import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import { cityTranslations, getColorHashCode, icons } from "@/constants";
import useAuthStore from "@/store/useAuthStore";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import AvailableRentType from "@/components/ui/AvailableRentType";

interface CarDetails {
  name: { [key: string]: string };
  year?: number;
  color?: string;
  mileage?: number;
}

interface RentSalary {
  daily?: { availability: boolean; price: number };
  weekly?: { availability: boolean; price: number };
  monthly?: { availability: boolean; price: number };
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
  const { user, language } = useAuthStore();
  const bookingTime =
    language === "en"
      ? "Today, 01:00 PM - 02:00 PM"
      : "اليوم، 1.00 مساءً إلى 2.00 مساءً";

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

  const translateCity = (
    city: string | undefined,
    language: "en" | "ar"
  ): string => {
    if (!city) return language === "ar" ? "غير معروف" : "Unknown";
    const translation = cityTranslations[city];
    return translation ? translation[language] : city;
  };

  const parsedCarDetails: CarDetails = parseJSON(carDetails);
  const parsedRentSalary: RentSalary = parseJSON(carRentSalary);

  const imageUri: string | undefined = Array.isArray(parseJSON(carImages))
    ? parseJSON(carImages)[0]
    : carImage;

  const color = getColorHashCode(parsedCarDetails?.color as any);

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
        <View
          className={` justify-between mt-4 ${
            language === "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <Text
            className={`text-2xl ${
              language === "ar"
                ? "text-right font-ZainBold"
                : "text-left font-MontserratBold"
            }`}
          >
            {parsedCarDetails.name[language]}
          </Text>
          <AvailableRentType
            rentType={parsedRentSalary} // Pass rentType from carInfo
            containerStyle={{ marginVertical: 10 }} // Optional container style
            textStyle={{ fontSize: 14, fontWeight: "bold" }} // Optional text style
          />
        </View>
        <View
          className={`justify-between my-3 items-center ${
            language === "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <View
            className={` items-center ${
              language === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Image
              source={icons.point}
              className="w-5 h-5 mx-1"
              tintColor={"#9CA4AB"}
              resizeMode="contain"
            />
            <Text
              className={`text-sm text-[#9CA4AB] ${
                language === "ar"
                  ? "text-right font-ZainBold"
                  : "text-left font-MontserratMedium"
              }`}
            >
              {translateCity(carCity as any, language) || "N/A"}
            </Text>
          </View>

          <Text className="text-sm text-[#9CA4AB] mt-2">
            {parsedCarDetails?.year || "N/A"} -{" "}
            <View
              className="w-5 h-2 rounded-full border-[1px] border-gray-300"
              style={{ backgroundColor: color }}
            ></View>
          </Text>
        </View>
        <View
          className={` flex-col  my-3 ${
            language === "ar" ? "items-end" : "items-start"
          }`}
        >
          <View
            className={`items-center ${
              language === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Image
              source={icons.Time}
              className="w-5 h-5 mx-1"
              tintColor={"#9CA4AB"}
              resizeMode="contain"
            />
            <Text
              className={`text-sm text-[#9CA4AB] ${
                language === "ar"
                  ? "text-right font-ZainBold"
                  : "text-left font-Montserrat"
              }`}
            >
              {translations[language].bookingHours}
            </Text>
          </View>
          <View
            className={`m-3  border-dashed border-[#E2E3E8] border-2 p-1 ${
              language === "ar" ? "mr-6" : "ml-6"
            }`}
          >
            <Text className="text-primary-400">{bookingTime}</Text>
          </View>
        </View>

        <View className="mt-4">
          <Text
            className={`text-lg  ${
              language === "ar"
                ? "text-right font-ZainBold"
                : "text-left font-MontserratBold"
            }`}
          >
            {translations[language].carDetails}
          </Text>
          <Text
            className={`text-gray-600  ${
              language === "ar"
                ? "text-right font-ZainRegular"
                : "text-left font-Montserrat"
            }`}
          >
            {translations[language].mileage}:{" "}
            {parsedCarDetails?.mileage || "N/A"}
          </Text>
        </View>

        <CustomButton
          title={translations[language].bookNow}
          className="rounded-lg mt-6 p-4"
          onPress={() => {
            if (!user) {
              router.replace({
                pathname: "/(auth)/sign-in",
              });
              return;
            }
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
