import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { TouchableFeildWithIconProps } from "@/types/type";
import { router } from "expo-router";

const TouchableFeildWithIcon = ({
  icon,
  title,
  pathName,
  titleStyle
}: TouchableFeildWithIconProps) => {
  return (
    <TouchableOpacity
      className="flex flex-row-reverse w-full items-center justify-start border-b border-[#E9EBED] pb-5 pt-3"
      onPress={() => router.push(pathName)}
    >
      <Image source={icon} resizeMode="contain" className="w-7 h-7"/>
      <Text className={`pr-4 font-ZainBold ${titleStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TouchableFeildWithIcon;
