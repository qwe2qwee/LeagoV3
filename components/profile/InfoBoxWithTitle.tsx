import { View, Text, Image } from "react-native";
import React from "react";
import { InfoBoxWithTitleProps } from "@/types/type";

const InfoBoxWithTitle = ({ title, info, icon }: InfoBoxWithTitleProps) => {
  return (
    <View className="justify-center items-end p-6 pb-0">
      <Text className="text-right font-ZainBold text-[#78828A]">{title}</Text>
      <View className={`${icon ? "flex flex-row-reverse items-center justify-between" : "items-end justify-center" } w-80 h-12  mt-3 rounded-xl bg-[#F7F7F7]`}>
        <Text className="pr-4 font-ZainRegular text-[#9CA4AB]">{info}</Text>
        {icon ? (
          <Image source={icon} resizeMode="contain" className="ml-4 w-5 h-5" />
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default InfoBoxWithTitle;
