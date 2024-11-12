import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { InfoBoxWithTitleProps } from "@/types/type";
import { radioButton } from "@/constants/profilePage";
import useAuthStore from "@/store/useAuthStore";

type gender = "male" | "female"

const RadioButton = ({ title }: {title: string}) => {
  const {language} = useAuthStore()
  const translator = radioButton.sex[language]
  const [gender, setGender] = useState< gender | undefined >(undefined);

  

  return (
    <View className="justify-center items-end p-6 pb-0">
      <Text className="text-right font-ZainBold text-[#78828A]">{title}</Text>
      <View className="flex flex-row-reverse w-full justify-around items-center mt-6">
        <TouchableOpacity className= "flex flex-row gap-2"  onPress={() => setGender("male")}>
          <Text className="font-ZainBold text-[#272B3B]">{translator.male}</Text>
          <View className="relative w-5 h-5">
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              className={`absolute w-full h-full ${gender === "male" ? "bg-primary-500" : ""} rounded-full`}
            />
            <Image
              source={radioButton.vector}
              resizeMode="contain"
              className="absolute w-3 h-3 top-1 left-1 -translate-x-1/2 -translate-y-1/2 "
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className= "flex flex-row gap-2"  onPress={() => setGender("female")}>
          <Text className="font-ZainBold text-[#272B3B]">{translator.female}</Text>
          <View className="relative w-5 h-5">
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              className={`absolute w-full h-full ${gender === "female" ? "bg-primary-500" : ""} rounded-full`}
            />
            <Image
              source={radioButton.vector}
              resizeMode="contain"
              className="absolute w-3 h-3 top-1 left-1 -translate-x-1/2 -translate-y-1/2 "
            />
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default RadioButton;
