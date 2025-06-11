import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { InfoBoxWithTitleProps } from "@/types/type";
import useAuthStore from "@/store/useAuthStore";

const InfoBoxWithTitle = ({ title, info }: InfoBoxWithTitleProps) => {
  const { language } = useAuthStore();
  // const language = "en";

  return (
    <View className="justify-center items-center p-6 pb-0  ">
      <Text
        className={` text-[#78828A] w-full  ${
          language === "ar"
            ? "font-ZainBold text-right"
            : "font-MontserratBold text-left"
        }   `}
      >
        {title}
      </Text>
      <View
        className="items-end justify-center  h-12 mt-3 rounded-xl bg-[#fff] w-11/12 "
        style={{ borderWidth: 1, borderColor: "#E5E5E5" }}
      >
        <Text
          className={`  font-ZainRegular text-[#9CA4AB] pr-4  ${
            language === "ar"
              ? "font-ZainBold text-right "
              : "font-MontserratBold text-right "
          }   `}
        >
          {info}
        </Text>
      </View>
    </View>
  );
};

export default InfoBoxWithTitle;
