import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter, useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import useAuthStore from "@/store/useAuthStore";
import { createRent } from "@/lib/appwrite/apit";
import { calculateDays, getTranslations, icons } from "@/constants";
import CustomButtonBook from "@/components/Home/CustomButtonBook";

// BookingPage Component
const BookingPage: React.FC = () => {
  const { user, language } = useAuthStore();
  const router = useRouter();
  const { carId, carRentSalary, ownerId } = useLocalSearchParams();
  const t = getTranslations(language, "bookingPage");

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
  const [loading, setLoading] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
    if (!startDate || !endDate || startDate < today || endDate < startDate) {
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

  const handleConfirmBooking = async () => {
    if (!isBookingValid()) {
      Alert.alert(t.invalidBooking, t.invalidBookingMessage);
      return;
    }

    setLoading(true);
    try {
      const totalPrice = calculateTotalPrice().toString();
      const rentalStart = startDate?.toISOString();
      const rentalEnd = endDate?.toISOString();

      await createRent({
        branchId: ownerId as string,
        carId: carId as string,
        userId: user?.$id as string,
        startDate: rentalStart!,
        endDate: rentalEnd!,
        status: "Pending",
        bill: totalPrice,
      });

      Alert.alert(
        t.bookingConfirmed,
        `${t.bookingSuccessMessage}${totalPrice}.`
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
      <View style={[styles.container]} className="relative pt-20">
        <View className="absolute top-2 left-2 right-2 flex-row justify-between p-2 z-10">
          <Pressable
            onPress={() => router.back()}
            className="bg-white rounded-full p-3 shadow-md"
          >
            <Image
              source={icons.backArrow}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </Pressable>
        </View>
        <Text style={styles.title}>{t.bookingDetails}</Text>
        <Text style={[language === "ar" ? styles.labelAr : styles.labelEn]}>
          {t.selectRentalPeriod}
        </Text>

        {/* Rental Period Buttons */}
        <View style={styles.periodContainer}>
          {["daily", "weekly", "monthly"].map((period) => (
            <Pressable
              key={period}
              onPress={() =>
                setRentalPeriod(period as "daily" | "weekly" | "monthly")
              }
              style={[
                [
                  language === "ar"
                    ? styles.periodButtonAr
                    : styles.periodButtonEn,
                ],

                rentalPeriod === period && styles.activePeriodButton,
                !parsedCarRentSalary[period]?.availability &&
                  styles.disabledButton,
              ]}
              disabled={!parsedCarRentSalary[period]?.availability}
            >
              <Text
                style={[
                  styles.periodText,
                  rentalPeriod === period && styles.activePeriodText,
                  !parsedCarRentSalary[period]?.availability &&
                    styles.disabledText,
                ]}
              >
                {t[period]}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Start Date */}
        <Text style={[language === "ar" ? styles.labelAr : styles.labelEn]}>
          {t.startDate}
        </Text>
        <Pressable
          onPress={() => setShowDatePicker("start")}
          style={styles.datePicker}
        >
          <Text style={styles.dateText}>
            {startDate ? startDate.toDateString() : t.selectStartDate}
          </Text>
        </Pressable>

        {/* End Date (Daily Only) */}
        {rentalPeriod === "daily" && (
          <>
            <Text style={[language === "ar" ? styles.labelAr : styles.labelEn]}>
              {t.endDate}
            </Text>
            <Pressable
              onPress={() => setShowDatePicker("end")}
              style={styles.datePicker}
            >
              <Text style={styles.dateText}>
                {endDate ? endDate.toDateString() : t.selectEndDate}
              </Text>
            </Pressable>
            {startDate && endDate && (
              <Text style={styles.infoText}>
                {t.totalDays}: {calculateDays(startDate, endDate)}
              </Text>
            )}
          </>
        )}

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={
              showDatePicker === "start" ? startDate || today : endDate || today
            }
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            minimumDate={today}
            style={styles.datePicker}
            onChange={(event, date) => {
              setShowDatePicker(null);
              if (date) {
                if (showDatePicker === "start") setStartDate(date);
                else if (rentalPeriod === "daily") setEndDate(date);
              }
            }}
          />
        )}

        {/* Total Price */}
        <Text
          style={[
            language === "ar" ? styles.totalPriceAr : styles.totalPriceEn,
          ]}
        >
          {t.totalPrice} : {calculateTotalPrice()}
        </Text>

        {/* Confirm Button */}
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <CustomButtonBook
            title={t.confirmBooking}
            onPress={handleConfirmBooking}
            disabled={!isBookingValid()}
            textStyle={styles.buttonText}
            className={[
              styles.confirmButton,
              !isBookingValid() && styles.disabledButton,
            ]}
          />
        )}
      </View>
    </ParallaxScrollView>
  );
};

export default BookingPage;

const styles = StyleSheet.create({
  container: { padding: 20 },
  rtl: { direction: "rtl", alignItems: "flex-end" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  labelEn: { fontSize: 18, marginVertical: 8, textAlign: "left" },
  labelAr: { fontSize: 18, marginVertical: 8, textAlign: "right" },

  periodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  periodButtonAr: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    textAlign: "center",
    width: 70,
  },
  periodButtonEn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    textAlign: "center",
    width: 80,
  },
  activePeriodButton: { backgroundColor: "#FF5C39" },
  disabledButton: { backgroundColor: "#B0B0B0" },
  periodText: { fontSize: 16, textAlign: "center" },
  activePeriodText: { color: "#FFF" },
  disabledText: { color: "#FFF" },
  datePicker: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 10,
    borderRadius: 8,
  },
  dateText: { fontSize: 16 },
  infoText: { fontSize: 16, marginVertical: 17, textAlign: "center" },
  totalPriceAr: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "right",
  },
  totalPriceEn: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "left",
  },

  confirmButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    marginTop: 16,
  },
  buttonText: { fontSize: 18, color: "#FFF", textAlign: "center" },
});
