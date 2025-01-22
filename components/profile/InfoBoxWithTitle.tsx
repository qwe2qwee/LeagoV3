import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { InfoBoxWithTitleProps } from "@/types/type";

const InfoBoxWithTitle = ({ title, info }: InfoBoxWithTitleProps) => {
  return (
    <View className="justify-center items-center p-6 pb-0">
      <Text className="text-right w-full font-ZainBold text-[#78828A]">
        {title}
      </Text>
      <View className="items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7]">
        <Text className="pr-4 font-ZainRegular text-[#9CA4AB]">{info}</Text>
      </View>
    </View>
  );
};

export default InfoBoxWithTitle;
