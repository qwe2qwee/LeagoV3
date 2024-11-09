import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { buttonTitles, onboarding } from "@/constants";
import CustomButton from "@/components/ui/CustomButton";
import useAuthStore from "@/store/useAuthStore";

// Define a type for the language
type Language = "en" | "ar";

const Onboarding: React.FC = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const { language, user } = useAuthStore();

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* Swiper Component for Onboarding Slides */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[6px] mx-[2px] h-[5px] bg-[#e2e8f0] rounded-full" />
        }
        activeDot={
          <View className="w-[15px] h-[4px] bg-primary-600 rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View key={item.id} className="flex items-center justify-center px-4">
            {/* Skip Button */}
            {item.skip && (
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/sign-in" as any)}
                className="w-full flex justify-end items-end p-5"
              >
                <Text className="text-black text-lg font-JakartaBold">
                  {item.skip[language]}
                </Text>
              </TouchableOpacity>
            )}

            <Image
              source={item.image[language]} // Dynamically select the image based on language
              className={`w-full h-[300px] ${item.skip ? "" : " h-[370px] w-full"}`}
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center mt-5">
              <Text
                className={`text-black text-3xl mx-10 text-center ${(language as any) === "en" ? "font-MontserratBold" : "font-ZainBold"}`}
              >
                {item.title[language]}{" "}
                {/* Display title in the selected language */}
              </Text>
            </View>
            <Text
              className={`text-[#858585] text-base font-JakartaSemiBold text-center mx-10 mt-3 ${(language as any) === "en" ? "font-MontserratRegular" : "font-ZainRegular"}`}
            >
              {item.description[language]}{" "}
              {/* Display description in the selected language */}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Next or Get Started Button */}
      <CustomButton
        title={
          isLastSlide
            ? buttonTitles[language].getStarted
            : buttonTitles[language].next
        }
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up" as any)
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-4 mb-8 rounded-xl"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
