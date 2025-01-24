import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import AvailableRentType from "../ui/AvailableRentType";

const CarList = ({ carInfo, distanceText, color, handlePress }: any) => {
  return (
    <TouchableOpacity
      className="flex-row w-auto h-28 bg-white m-2 p-2 px-3 rounded-lg shadow-md"
      onPress={handlePress}
    >
      <View className="items-center justify-center bg-[#EBEBEF] p-2 mr-4 rounded-xl">
        <Image
          source={{ uri: carInfo.image }}
          resizeMode="contain"
          className="h-20 w-20 rounded-lg "
        />
      </View>

      <View className="flex-1 justify-between flex-row items-center ">
        <View className="flex-col h-4/5 justify-between">
          <Text className="text-lg font-bold">{carInfo.name?.ar || "N/A"}</Text>
          <View>
            <View
              className={`w-3 h-3 rounded-full border border-gray-400 my-1`}
              style={{ backgroundColor: color }}
            ></View>
            <Text className="text-gray-600">{carInfo.year || "N/A"}</Text>
          </View>
        </View>
        <View className="flex-col justify-between items-end h-4/5">
          <View className="flex-row-reverse justify-center items-center">
            <Image source={icons.point1} className="w-4 h-4" />
            <Text className="text-[#868686] text-sm">{distanceText}</Text>
          </View>
          <AvailableRentType
            rentType={carInfo.rentType} // Pass rentType from carInfo
            containerStyle={{ marginVertical: 0 }} // Optional container style
            textStyle={{ fontSize: 14, fontWeight: "bold" }} // Optional text style
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CarList;
