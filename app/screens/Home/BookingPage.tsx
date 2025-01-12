import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/ui/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { bookingPage } from "@/constants";
import useAuthStore from "@/store/useAuthStore";
import { createRent } from "@/lib/appwrite/apit";

const BookingPage: React.FC = () => {
  const { language, user } = useAuthStore();
  const router = useRouter();
  const { carId, carRentSalary, ownerId } = useLocalSearchParams();

  const translations: any = {
    en: {
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
    },
    ar: {
      daily: "يومي",
      weekly: "أسبوعي",
      monthly: "شهري",
    },
  };

  const parsedCarRentSalary =
    typeof carRentSalary === "string"
      ? JSON.parse(carRentSalary)
      : carRentSalary;
  const [rentalPeriod, setRentalPeriod] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<"start" | "end" | null>(
    null
  );

  // Minimum selectable date is today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Automatically calculate end date for weekly and monthly rentals
  useEffect(() => {
    if (rentalPeriod === "daily" || !startDate) return;
    const calculatedEndDate = new Date(startDate);
    if (rentalPeriod === "weekly") {
      calculatedEndDate.setDate(startDate.getDate() + 7);
    } else if (rentalPeriod === "monthly") {
      calculatedEndDate.setMonth(startDate.getMonth() + 1);
    }
    setEndDate(calculatedEndDate);
  }, [startDate, rentalPeriod]);

  const isBookingValid = () => {
    if (
      !startDate ||
      !endDate ||
      startDate < today ||
      endDate < today ||
      endDate < startDate
    ) {
      return false;
    }
    return true;
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const price = parsedCarRentSalary[rentalPeriod]?.price || 0;
    if (rentalPeriod === "daily") {
      const diffDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return price * diffDays;
    }
    return price;
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    return Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };
  const handleConfirmBooking = async () => {
    if (!isBookingValid()) {
      Alert.alert(
        bookingPage[language].invalidBooking,
        bookingPage[language].invalidBookingMessage
      );
      return;
    }

    const totalPrice = calculateTotalPrice().toString();
    const rentalStart = startDate?.toISOString();
    const rentalEnd = endDate?.toISOString();

    try {
      // Create rent document
      await createRent({
        branchId: ownerId as string, // Replace with the actual branchId
        carId: carId as string,
        userId: user?.$id as string,
        startDate: rentalStart!,
        endDate: rentalEnd!,
        status: "Pending", // Default status
        bill: totalPrice,
      });

      Alert.alert(
        bookingPage[language].bookingConfirmed,
        `${bookingPage[language].bookingSuccessMessage}${totalPrice}.`
      );
      router.back();
    } catch (error) {
      Alert.alert(
        bookingPage[language].invalidBookingMessage,
        "Failed to create rent document. Please try again."
      );
    }
  };

  return (
    <SafeAreaView className="p-4">
      <View className="flex-row justify-between">
        <Text
          className={`text-2xl font-bold my-4 ${language == "ar" ? "font-ZainRegular" : "font-MontserratBold"}`}
        >
          {bookingPage[language].bookingDetails}
        </Text>
        {/* <Pressable onPress={() => setLanguage(language === "en" ? "ar" : "en")}>
          <Text>{language === "en" ? "AR" : "EN"}</Text>
        </Pressable> */}
      </View>

      <Text
        className={`text-lg ${language == "ar" ? "font-ZainRegular" : "font-MontserratBold"}`}
      >
        {bookingPage[language].selectRentalPeriod}
      </Text>
      <View className="flex-row mt-2 justify-around">
        {["daily", "weekly", "monthly"].map((period) => (
          <Pressable
            key={period}
            onPress={() =>
              setRentalPeriod(period as "daily" | "weekly" | "monthly")
            }
            className={`px-4 py-2 rounded-lg ${
              rentalPeriod === period ? "bg-primary-400" : "bg-gray-300"
            } ${!parsedCarRentSalary[period]?.availability ? "bg-textColor-500" : ""}`}
            disabled={!parsedCarRentSalary[period]?.availability}
          >
            <Text
              className={`${
                rentalPeriod === period ? "text-white" : "text-textColor-600"
              } ${!parsedCarRentSalary[period]?.availability ? "text-white" : ""}`}
            >
              {translations[language][period]}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text className="text-lg mt-4">{bookingPage[language].startDate}</Text>
      <Pressable
        onPress={() => setShowDatePicker("start")}
        className="border border-gray-300 p-3 rounded-lg mt-2"
      >
        <Text
          className={`${language == "ar" ? "font-ZainRegular" : "font-MontserratBold"}`}
        >
          {startDate
            ? startDate.toDateString()
            : bookingPage[language].selectStartDate}
        </Text>
      </Pressable>

      {rentalPeriod === "daily" && (
        <>
          <Text
            className={`text-lg mt-4 ${language == "ar" ? "font-ZainRegular" : "font-MontserratBold"}`}
          >
            {bookingPage[language].endDate}
          </Text>
          <Pressable
            onPress={() => setShowDatePicker("end")}
            className="border border-gray-300 p-3 rounded-lg mt-2"
          >
            <Text
              className={`${language == "ar" ? "font-ZainRegular" : "font-MontserratBold"}`}
            >
              {endDate
                ? endDate.toDateString()
                : bookingPage[language].selectEndDate}
            </Text>
          </Pressable>
          {startDate && endDate && (
            <Text className="text-lg mt-4">
              {bookingPage[language].totalDays}: {calculateDays()}
            </Text>
          )}
        </>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={
            showDatePicker === "start" ? startDate || today : endDate || today
          }
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          minimumDate={today}
          style={styles.picker}
          onChange={(event, date) => {
            setShowDatePicker(null);
            if (date) {
              if (showDatePicker === "start") {
                setStartDate(date);
                if (rentalPeriod !== "daily") setEndDate(null); // Reset end date if switching
              } else if (rentalPeriod === "daily") {
                setEndDate(date);
              }
            }
          }}
        />
      )}

      <Text
        className={`text-xl font-bold mt-6 ${language == "ar" ? "font-ZainRegular" : "font-MontserratBold"}`}
      >
        {bookingPage[language].totalPrice}: ${calculateTotalPrice()}
      </Text>
      <CustomButton
        title={bookingPage[language].confirmBooking}
        onPress={handleConfirmBooking}
        disabled={!isBookingValid()}
        textStyle="text-white text-center text-lg font-semibold"
        className={`mt-6 p-4 rounded-lg ${
          isBookingValid() ? "bg-primary-400" : "bg-gray-400"
        }`}
      />
    </SafeAreaView>
  );
};

export default BookingPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000", // Customize background color
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937", // Customize label color
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#000", // Customize picker background color
    borderRadius: 10,
    padding: 10,
  },
});
