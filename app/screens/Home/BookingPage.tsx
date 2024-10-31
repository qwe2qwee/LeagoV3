import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

interface BookingPageProps {}

const BookingPage: React.FC<BookingPageProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { carId } = route.params as { carId: string };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //   const handleBooking = async () => {
  //     try {
  //       await AppwriteService.createRental({
  //         carId,
  //         startDate,
  //         endDate,
  //       });
  //       Alert.alert("Booking confirmed", "Your rental has been booked successfully!");
  //       navigation.goBack();
  //     } catch (error) {
  //       Alert.alert("Booking failed", "Please try again.");
  //     }
  //   };

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold my-4">Booking Details</Text>

      <Text className="text-lg">Start Date</Text>
      <TextInput
        value={startDate}
        onChangeText={setStartDate}
        placeholder="YYYY-MM-DD"
        className="border border-gray-300 p-2 rounded-lg mt-2"
      />

      <Text className="text-lg mt-4">End Date</Text>
      <TextInput
        value={endDate}
        onChangeText={setEndDate}
        placeholder="YYYY-MM-DD"
        className="border border-gray-300 p-2 rounded-lg mt-2"
      />

      <Pressable onPress={() => {}} className="mt-6 p-4 bg-blue-600 rounded-lg">
        <Text className="text-white text-center text-lg font-semibold">
          Confirm Booking
        </Text>
      </Pressable>
    </View>
  );
};

export default BookingPage;
