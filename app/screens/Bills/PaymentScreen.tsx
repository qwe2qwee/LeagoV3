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
  ScrollView,
} from "react-native";
import { encode as btoa } from "base-64";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import CustomTextInput from "@/components/Bills/CustomTextInput";
import CustomButton from "@/components/ui/CustomButton";
import { updatePayStatusInAppwrite } from "@/lib/appwrite/apit";

interface PaymentScreenParams {
  total: number; // Total amount to be paid
}

const PaymentScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");

  const { total, reservationId } = useLocalSearchParams() as any;

  const createPayment = async () => {
    const url = process.env.EXPO_PUBLIC_MOYASAR_URL || "";
    const username = process.env.EXPO_PUBLIC_MOYASAR_KEY || "";
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
        await updatePayStatusInAppwrite(reservationId, ddd);
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
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="p-2 pt-7 w-full h-full px-5 bg-white relative"
          showsVerticalScrollIndicator={false}
        >
          <Pressable className="w-full pb-5" onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="gray" />
          </Pressable>

          <View className="w-full h-3/4 py-5 justify-center items-center  ">
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
              placeholder="الاسم"
              value={name}
              onChangeText={setName}
            />
            <CustomTextInput
              placeholder="رقم البطاقة"
              value={number}
              onChangeText={setNumber}
              keyboardType="numeric"
            />

            <View className="flex-row justify-between w-full mb-4 ">
              <CustomTextInput
                placeholder="MM/YY"
                value={expiry}
                onChangeText={setExpiry}
                keyboardType="numbers-and-punctuation"
                containerStyle={"w-[45%] "}
              />
              <CustomTextInput
                placeholder="CVC"
                value={cvc}
                onChangeText={setCvc}
                keyboardType="numeric"
                containerStyle={"w-[45%]"}
              />
            </View>
          </View>

          <View className="w-full h-1/5 flex-row justify-center">
            <View className="w-[50%] px-1 justify-center items-center">
              <CustomButton
                title="ادفع الان"
                onPress={createPayment}
                loading={isLoading}
                className="w-full my-3 py-1 bg-primary "
              />
            </View>
            <View className="w-[50%] px-1 justify-center items-center py-10">
              <Text className="font-zainRegular"> المبلغ الإجمالي</Text>
              <Text className="font-zainRegular text-xl">{total} ريال</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
