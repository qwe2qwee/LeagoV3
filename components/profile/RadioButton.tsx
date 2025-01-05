import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { radioButton } from "@/constants/profilePage";
import useAuthStore from "@/store/useAuthStore";
import { useUserDetailsStore } from "@/store/UserDetailsStore";

type Gender = "male" | "female";

const RadioButton: React.FC = () => {
  const { language, user } = useAuthStore();
  const translator = radioButton.radio[language];
  const { details, setDetails } = useUserDetailsStore();

  // Initial gender value from user details, defaults to "undefined" if invalid
  const [gender, setGender] = useState<Gender | undefined>(
    user?.details.gender === "male" || user?.details.gender === "female"
      ? user.details.gender
      : undefined
  );

  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);
    setDetails({ gender: newGender });
  };

  useEffect(() => {
    // Set initial gender from user details on mount
    if (user?.details.gender === "male" || user?.details.gender === "female") {
      setGender(user.details.gender);
    } else {
      setGender(undefined);
    }
  }, [user]);

  return (
    <View className="justify-center items-end p-6 pb-0">
      <Text className="text-right font-ZainBold text-[#78828A]">
        {translator.gender}
      </Text>
      <View className="flex flex-row-reverse w-full justify-around items-center mt-6">
        {/* Male Option */}
        <TouchableOpacity
          className="flex flex-row gap-2"
          onPress={() => handleGenderChange("male")}
        >
          <Text
            className={`font-ZainBold ${
              gender === "male" ? "text-primary-400" : "text-gray-400"
            }`}
          >
            {translator.male}
          </Text>
          <View className="relative w-5 h-5">
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              className={`absolute w-full h-full ${
                gender === "male" ? "bg-primary-400" : ""
              } rounded-full`}
            />
            {gender === "male" && (
              <Image
                source={radioButton.vector}
                resizeMode="contain"
                className="absolute w-3 h-3 top-1 left-1 -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Female Option */}
        <TouchableOpacity
          className="flex flex-row gap-2"
          onPress={() => handleGenderChange("female")}
        >
          <Text
            className={`font-ZainBold ${
              gender === "female" ? "text-primary-400" : "text-gray-400"
            }`}
          >
            {translator.female}
          </Text>
          <View className="relative w-5 h-5">
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              className={`absolute w-full h-full ${
                gender === "female" ? "bg-primary-400" : ""
              } rounded-full`}
            />
            {gender === "female" && (
              <Image
                source={radioButton.vector}
                resizeMode="contain"
                className="absolute w-3 h-3 top-1 left-1 -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RadioButton;
