import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { address, pageTitle } from "@/constants/profilePage";
import useAuthStore from "@/store/useAuthStore";
import { router } from "expo-router";
import { icons } from "@/constants";
import InputFieldAddress from "@/components/Profile/InputFieldAddress";

const Address = () => {
  const { language, user } = useAuthStore();
  const addressTranslator = address[language];
  const pageTitleTranslator = pageTitle[language];

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-row justify-between items-center p-6 ">
        <Pressable
          onPress={() => router.back()}
          className="bg-white rounded-full shadow-md"
        >
          <Image
            source={icons.backArrow}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </Pressable>
        <Text
          className={`${language === "ar" ? "font-ZainExtraBold" : "font-MontserratBold"} text-center text-[#272B3B] `}
        >
          {pageTitleTranslator.myAddress}
        </Text>
      </View>
      <View className="items-center">
        <InputFieldAddress
          label={addressTranslator.country}
          labelStyle=""
          containerStyle="items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]"
          inputStyle=""
          onChangeText={() => {}}
        />
        <InputFieldAddress
          label={addressTranslator.region}
          labelStyle=""
          containerStyle="items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]"
          inputStyle=""
          onChangeText={() => {}}
        />
        <InputFieldAddress
          label={addressTranslator.city}
          labelStyle=""
          containerStyle="items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]"
          inputStyle=""
          onChangeText={() => {}}
        />
        <InputFieldAddress
          label={addressTranslator.district}
          labelStyle=""
          containerStyle="items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]"
          inputStyle=""
          onChangeText={() => {}}
        />
        <InputFieldAddress
          label={addressTranslator.street}
          labelStyle=""
          containerStyle="items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]"
          inputStyle=""
          onChangeText={() => {}}
        />
        <InputFieldAddress
          label={addressTranslator.building}
          labelStyle=""
          containerStyle="items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]"
          inputStyle=""
          onChangeText={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Address;
