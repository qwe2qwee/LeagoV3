import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter, useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import useAuthStore from "@/store/useAuthStore";
import { createRent } from "@/lib/appwrite/apit";
import { calculateDays, getTranslations, icons } from "@/constants";
import CustomButtonBook from "@/components/Home/CustomButtonBook";

const rentalPeriods = ["daily", "weekly", "monthly"] as const;

const BookingPage2 = () => {
  const { user, language } = useAuthStore();
  const router = useRouter();
  const { carId, carRentSalary, ownerId } = useLocalSearchParams();
  const t = getTranslations(language, "bookingPage");

  const [rentalPeriod, setRentalPeriod] =
    useState<(typeof rentalPeriods)[number]>("daily");
  const [dates, setDates] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [showDatePicker, setShowDatePicker] = useState<"start" | "end" | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const parsedRentSalary =
    typeof carRentSalary === "string"
      ? JSON.parse(carRentSalary)
      : carRentSalary;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (rentalPeriod === "daily" || !dates.start) return;

    const endDate = new Date(dates.start);
    endDate.setDate(
      dates.start.getDate() +
        (rentalPeriod === "weekly" ? 7 : rentalPeriod === "monthly" ? 30 : 0)
    );

    setDates((prev) => ({ ...prev, end: endDate }));
  }, [dates.start, rentalPeriod]);

  const validateBooking = () => {
    const { start, end } = dates;
    return !!start && !!end && start >= today && end >= start;
  };

  const calculatePrice = () => {
    const { start, end } = dates;
    if (!start || !end) return 0;

    const basePrice = parsedRentSalary[rentalPeriod]?.price || 0;
    return rentalPeriod === "daily"
      ? basePrice * calculateDays(start, end)
      : basePrice;
  };

  const handleDateChange = (type: "start" | "end", date?: Date) => {
    if (!date) return;
    setDates((prev) => ({ ...prev, [type]: date }));
    setShowDatePicker(null);
  };

  const confirmBooking = async () => {
    if (!validateBooking()) {
      Alert.alert(t.invalidBooking, t.invalidBookingMessage);
      return;
    }

    setLoading(true);
    try {
      await createRent({
        branchId: ownerId as string,
        carId: carId as string,
        userId: user?.$id!,
        startDate: dates.start!.toISOString(),
        endDate: dates.end!.toISOString(),
        status: "Pending",
        bill: calculatePrice().toString(),
      });

      Alert.alert(
        t.bookingConfirmed,
        `${t.bookingSuccessMessage}${calculatePrice()}.`
      );
      router.back();
    } catch (error) {
      Alert.alert(t.errorTitle, t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      <View className="pt-20 px-5">
        <Pressable
          onPress={router.back}
          className="absolute top-2 left-2 bg-white rounded-full p-3 shadow-md z-10"
        >
          <Image source={icons.backArrow} className="w-6 h-6" />
        </Pressable>

        <Text className="text-2xl font-bold text-center mb-4">
          {t.bookingDetails}
        </Text>

        <Text
          className={`text-lg mb-2 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t.selectRentalPeriod}
        </Text>

        <View className="flex-row justify-between mb-6">
          {rentalPeriods.map((period) => (
            <Pressable
              key={period}
              onPress={() =>
                parsedRentSalary[period]?.availability &&
                setRentalPeriod(period)
              }
              className={`px-4 py-2 rounded-lg ${
                parsedRentSalary[period]?.availability
                  ? rentalPeriod === period
                    ? "bg-orange-500"
                    : "bg-gray-200"
                  : "bg-gray-400"
              }`}
            >
              <Text
                className={`text-center ${
                  rentalPeriod === period ? "text-white" : "text-gray-700"
                }`}
              >
                {t[period]}
              </Text>
            </Pressable>
          ))}
        </View>

        <DatePickerSection
          label={t.startDate}
          value={dates.start}
          placeholder={t.selectStartDate}
          onPress={() => setShowDatePicker("start")}
          language={language}
        />

        {rentalPeriod === "daily" && (
          <>
            <DatePickerSection
              label={t.endDate}
              value={dates.end}
              placeholder={t.selectEndDate}
              onPress={() => setShowDatePicker("end")}
              language={language}
            />
            {dates.start && dates.end && (
              <Text className="text-center text-base my-4">
                {t.totalDays}: {calculateDays(dates.start, dates.end)}
              </Text>
            )}
          </>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={dates[showDatePicker] || today}
            mode="date"
            minimumDate={
              showDatePicker === "start" ? today : dates.start || today
            }
            onChange={(_, date) => handleDateChange(showDatePicker, date)}
          />
        )}

        <Text
          className={`text-xl font-bold mt-6 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t.totalPrice}: {calculatePrice()}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" className="mt-8" />
        ) : (
          <CustomButtonBook
            title={t.confirmBooking}
            onPress={confirmBooking}
            disabled={!validateBooking()}
            className={`mt-6 ${
              !validateBooking() ? "bg-gray-400" : "bg-green-500"
            }`}
          />
        )}
      </View>
    </ParallaxScrollView>
  );
};

const DatePickerSection = ({
  label,
  value,
  placeholder,
  onPress,
  language,
}: any) => (
  <>
    <Text
      className={`text-lg mb-2 ${
        language === "ar" ? "text-right" : "text-left"
      }`}
    >
      {label}
    </Text>
    <Pressable
      onPress={onPress}
      className="border border-gray-300 p-3 rounded-lg mb-4"
    >
      <Text className="text-base">{value?.toDateString() || placeholder}</Text>
    </Pressable>
  </>
);

export default BookingPage2;
