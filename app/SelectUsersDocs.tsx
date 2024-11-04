import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { buttonTitles, onboarding } from "@/constants";
import { uploadFile } from "@/lib/appwrite/apit";
import CustomButton from "@/components/ui/CustomButton";
import useAuthStore from "@/store/useAuthStore";

type Language = "en" | "ar";

const SelectUsersDocs: React.FC = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [identityImage, setIdentityImage] = useState<string | null>(null);
  const [licenseImage, setLicenseImage] = useState<string | null>(null);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const language: Language = "ar"; // Set language based on user preference

  const { user, getCurrentUser, createUser, logout, loading, error } =
    useAuthStore();

  const pickImage = async (type: "identity" | "license") => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Please allow access to the camera roll."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      const fileAsset = {
        uri: asset.uri,
        mimeType: asset.type || "image/jpeg",
        name: asset.fileName || "uploaded_image.jpg",
      };

      try {
        const fileUrl = await uploadFile(fileAsset, type);
        if (type === "identity") {
          setIdentityImage(fileUrl);
        } else {
          setLicenseImage(fileUrl);
        }
        console.log(`${type} image uploaded successfully:`, fileUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* Index Indicators with a line */}
      <View className="flex flex-row justify-center items-center mt-4">
        {onboarding.slice(0, 2).map((_, index) => (
          <React.Fragment key={index}>
            <View
              className={`w-4 h-4 rounded-full ${
                activeIndex === index ? "bg-primary-600" : "bg-gray-300"
              }`}
            />
            {index < 1 && <View className="w-8 h-[2px] bg-gray-400 mx-2" />}
          </React.Fragment>
        ))}
      </View>

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
        {onboarding.slice(0, 2).map((item, index) => (
          <View key={item.id} className="flex items-center justify-center px-4">
            <Text className="text-black text-lg font-bold mb-4">
              {index === 0 ? "Select Identity Image" : "Select License Image"}
            </Text>
            <TouchableOpacity
              onPress={() => pickImage(index === 0 ? "identity" : "license")}
              className="border-dashed border-2 border-gray-400 rounded-lg w-3/4 h-40 flex items-center justify-center"
            >
              <Image
                source={
                  index === 0
                    ? identityImage
                      ? { uri: identityImage }
                      : null
                    : licenseImage
                      ? { uri: licenseImage }
                      : null
                }
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
              <Text className="text-gray-500">
                {index === 0 ? "Upload Identity Image" : "Upload License Image"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={
          isLastSlide
            ? buttonTitles[language]?.getStarted || "Get Started"
            : buttonTitles[language]?.next || "Next"
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

export default SelectUsersDocs;
