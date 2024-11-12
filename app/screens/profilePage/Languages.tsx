import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/store/useAuthStore";
import { languageChoices, radioButton } from "@/constants/profilePage";
import { Image } from "react-native";

const Languages = () => {
  const {language} = useAuthStore();
  const translator = languageChoices[language]
  return (
    <SafeAreaView>
        <Text
        className={`${language === "ar" ? "font-ZainExtraBold" : "font-MontserratBold"} mt-3 text-center text-[#272B3B] `}
      >
        {translator.title}
      </Text>
      <View className="m-6">
        <TouchableOpacity className="flex flex-row-reverse w-full items-center justify-between border-b border-[#E9EBED] pb-5 pt-3">
          <Text className="pr-4 font-ZainBold">{translator.arabic}</Text>
          <View className="relative w-5 h-5">
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              className= "absolute w-full h-full  bg-primary-500  rounded-full"
            />
            <Image
              source={radioButton.vector}
              resizeMode="contain"
              className="absolute w-3 h-3 top-1 left-1 -translate-x-1/2 -translate-y-1/2 "
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row-reverse w-full items-center justify-between border-b border-[#E9EBED] pb-5 pt-3">
          <Text className="pr-4 font-ZainBold">{translator.english}</Text>
          <View className="relative w-5 h-5">
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              className= "absolute w-full h-full  bg-primary-500  rounded-full"
            />
            <Image
              source={radioButton.vector}
              resizeMode="contain"
              className="absolute w-3 h-3 top-1 left-1 -translate-x-1/2 -translate-y-1/2 "
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Languages;
