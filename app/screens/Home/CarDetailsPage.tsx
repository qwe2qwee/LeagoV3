import React from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const CarDetailsPage: React.FC = () => {
  const { carId, carDetails, carName, carRentSalary, carImages, carImage } =
    useLocalSearchParams();
  const router = useRouter();

  // Parsing JSON strings from the params
  const parsedCarDetails = JSON.parse(carDetails[0] as string);
  const parsedRentSalary = JSON.parse(carRentSalary as string);
  const parsedImages = JSON.parse(carImages as string);
  console.log(parsedCarDetails);

  return (
    <ScrollView className="p-4">
      <Image
        source={{ uri: carImage as string }}
        className="h-48 w-full rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold my-4">{carName}</Text>
      <Text className="text-lg text-gray-600">
        {parsedCarDetails.year} - {parsedCarDetails.color}
      </Text>
      <Text className="text-lg text-gray-600">{parsedCarDetails.city}</Text>
      <Text className="text-xl text-green-600 my-2">
        ${parsedRentSalary.daily.price}/day
      </Text>

      <View className="mt-4">
        <Text className="text-lg font-semibold">Car Details</Text>
        <Text className="text-gray-600">
          Mileage: {parsedCarDetails.mileage}
        </Text>
        <Text className="text-gray-600">
          Transmission: {parsedCarDetails.transmission}
        </Text>
      </View>

      <Pressable
        onPress={() => router.push({ pathname: "/book", params: { carId } })}
        className="mt-6 p-4 bg-blue-600 rounded-lg"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Book Now
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default CarDetailsPage;
