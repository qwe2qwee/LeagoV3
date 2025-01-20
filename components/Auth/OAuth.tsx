import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";
import CustomButton from "../ui/CustomButton";

const OAuth = () => {
  const handleGoogle = () => {};
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3 ">
        <View className="flex-1 h-[1px] bg-slate-400" />
        <Text className="text-general-100 text-lg font-JakartaSemiBold  flex justify-center items-center">
          Or
        </Text>
        <View className="flex-1 h-[1px] bg-slate-400" />
      </View>
      {/* <CustomButton
        className="mt-5  w-16 mx-auto bg-textColor-50 shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className=" w-7 h-7 m-1"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={() => console.log("Sign in with Google")}
      /> */}
    </View>
  );
};

export default OAuth;
