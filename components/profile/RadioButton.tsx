import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { InfoBoxWithTitleProps } from "@/types/type";
import { radioButton } from "@/constants/profilePage";
import useAuthStore from "@/store/useAuthStore";

type Gender = "male" | "female"

// Define the props type for RadioButton 
interface RadioButtonProps { onGenderChange: (gender: Gender) => void }

const RadioButton = ( {onGenderChange} : RadioButtonProps ) => {
  const {language} = useAuthStore()
  const translator = radioButton.radio[language]
  const [gender, setGender] = useState< Gender | undefined >(undefined);

  const handleGenderChange = (newGender : Gender) => {
    setGender(newGender);
    onGenderChange(newGender)
  }

  

  return (
    <View className="justify-center items-end p-6 pb-0">
      <Text className="text-right font-ZainBold text-[#78828A]">{translator.gender}</Text>
      <View className="flex flex-row-reverse w-full justify-around items-center mt-6">
        <TouchableOpacity className= "flex flex-row gap-2"  onPress={() => handleGenderChange("male")}>
          <Text className="font-ZainBold text-primary-400">{translator.male}</Text>
          <View className="relative w-5 h-5">
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              className={`absolute w-full h-full ${gender === "male" ? "bg-primary-400" : ""} rounded-full`}
            />
            <Image
              source={radioButton.vector}
              resizeMode="contain"
              className="absolute w-3 h-3 top-1 left-1 -translate-x-1/2 -translate-y-1/2 "
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className= "flex flex-row gap-2"  onPress={() => handleGenderChange("female")}>
          <Text className="font-ZainBold text-primary-400">{translator.female}</Text>
          <View className="relative w-5 h-5">
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              className={`absolute w-full h-full ${gender === "female" ? "bg-primary-400" : ""} rounded-full`}
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
