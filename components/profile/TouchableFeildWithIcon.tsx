import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { TouchableFeildWithIconProps } from "@/types/type";
import { router } from "expo-router";
import useAuthStore from "@/store/useAuthStore";

const TouchableFeildWithIcon = ({
  icon,
  title,
  pathName,
  titleStyle,
}: TouchableFeildWithIconProps) => {
  const { language } = useAuthStore();
  // const language = "en";

  return (
    <TouchableOpacity
      className={`flex  w-full items-center  border-b border-[#E9EBED] pb-5 pt-3  ${
        language === "ar"
          ? "flex-row-reverse justify-start "
          : "justify-start flex-row "
      }  ${titleStyle} `}
      onPress={() => router.push(pathName)}
    >
      <Image source={icon} resizeMode="contain" className="w-7 h-7" />
      <Text
        className={` ${
          language === "ar"
            ? "font-ZainBold text-right pr-4"
            : "font-MontserratBold text-left pl-4"
        }  ${titleStyle} `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TouchableFeildWithIcon;
