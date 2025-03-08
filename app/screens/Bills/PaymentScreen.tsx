import React, { useState } from "react";
import {
  View,
  Pressable,
  Image,
  Alert,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { encode as btoa } from "base-64";
import { router, useLocalSearchParams } from "expo-router";
import CustomTextInput from "@/components/Bills/CustomTextInput";
import CustomButton from "@/components/ui/CustomButton";
import { updatePayStatusInAppwrite } from "@/lib/appwrite/apit";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { moyasarConfig } from "@/lib/appwrite/config";
import { icons } from "@/constants";
import useAuthStore from "@/store/useAuthStore";

const translations = {
  en: {
    title: "Payment Details",
    name: "Cardholder Name",
    cardNumber: "Card Number",
    expiry: "MM/YY",
    cvc: "CVC",
    payNow: "Pay Now",
    totalAmount: "Total Amount",
    currency: "SAR",
    paymentSuccess: "Payment Successful",
    paymentFailed: "Payment Failed",
    error: "Error",
    retry: "Try Again",
    back: "Back",
  },
  ar: {
    title: "تفاصيل الدفع",
    name: "اسم صاحب البطاقة",
    cardNumber: "رقم البطاقة",
    expiry: "شهر/سنة",
    cvc: "رمز التحقق",
    payNow: "ادفع الآن",
    totalAmount: "المبلغ الإجمالي",
    currency: "ريال",
    paymentSuccess: "تم الدفع بنجاح",
    paymentFailed: "فشل في الدفع",
    error: "خطأ",
    retry: "حاول مرة أخرى",
    back: "عودة",
  },
};

const PaymentScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");

  const { total, reservationId, branchId } = useLocalSearchParams() as any;
  const { language, user } = useAuthStore();

  const t = translations[language];

  const createPayment = async () => {
    const url = moyasarConfig.url || "";
    const username = moyasarConfig.key || "";
    const password = "";
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);

    const [month, year] = expiry.split("/");

    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: `${"00" + total}`,
          currency: "SAR",
          source: {
            type: "creditcard",
            name,
            number,
            cvc,
            month,
            year,
          },
          description: "Payment for Order #1234",
          callback_url: "https://example.com/thankyou",
        }),
      });

      const data = await response.json();
      console.log("Payment Response:", data);

      if (response.ok) {
        const ddd = {
          done: true as boolean,
          payId: data.id as string,
          price: total as string,
        };

        await updatePayStatusInAppwrite(
          reservationId,
          ddd,
          user?.$id,
          branchId
        );
        router.push({
          pathname: "/screens/Bills/PaymentCompletePage",
          params: { paymentId: data.id },
        });
      } else {
        Alert.alert("Payment Failed", data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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

        <View className=" h-3/4 pt-5 px-6 mt-12 justify-center items-center ">
          <View
            style={styles.shadowBox}
            className="w-full bg-primary-400 flex-row items-center justify-around px-5 rounded-lg my-5"
          >
            <Image
              source={require("../../../assets/images/VISA.png")}
              className="my-4 mr-3 h-10 w-11"
              resizeMode="contain"
            />
            <Image
              source={require("../../../assets/images/MASTERCARD.png")}
              className="my-4 mr-4 h-10 w-11"
              resizeMode="contain"
            />
            <Image
              source={require("../../../assets/images/MADA.png")}
              className="my-4 mr-4 h-10 w-11"
              resizeMode="contain"
            />
          </View>

          <CustomTextInput
            placeholder={t.name}
            value={name}
            onChangeText={setName}
            containerStyle="w-[98%] px-0"
          />
          <CustomTextInput
            placeholder={t.cardNumber}
            value={number}
            onChangeText={setNumber}
            keyboardType="numeric"
            containerStyle="w-[98%]"
          />

          <View className="flex-row justify-between  mb-4 max-w-[100vw] ">
            <CustomTextInput
              placeholder={t.expiry}
              value={expiry}
              onChangeText={setExpiry}
              keyboardType="numbers-and-punctuation"
              containerStyle={"w-[45%] mr-3"}
            />
            <CustomTextInput
              placeholder={t.cvc}
              value={cvc}
              onChangeText={setCvc}
              keyboardType="numeric"
              containerStyle={"w-[45%] ml-3"}
            />
          </View>
        </View>

        <View className="w-full h-2/5 px-6  flex-col-reverse justify-center items-center">
          <View className="w-[50%] px-1 justify-center items-center">
            <CustomButton
              title={t.payNow}
              onPress={createPayment}
              loading={isLoading}
              className="w-full my-2 p-3 bg-primary "
            />
          </View>
          <View className="w-[50%] px-1 justify-center items-center py-10">
            <Text className="font-zainRegular"> {t.totalAmount}</Text>
            <Text className="font-zainRegular text-xl">
              {total} {t.currency}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  shadowBox: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
