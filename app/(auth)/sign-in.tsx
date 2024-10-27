import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/Auth/InputField";
import { icons, images, translationsLogin } from "@/constants";
import OAuth from "@/components/Auth/OAuth";
import { Link, router } from "expo-router";
import LeagoMark from "@/components/Auth/LeagoMark";
import { signIn } from "@/lib/appwrite/apit";

// Define a type for the language
type Language = "en" | "ar";

const signUp = () => {
  const [language, setLanguage] = useState<Language>("ar"); // Simulating language toggle

  const t = translationsLogin[language]; // Choose the right translation

  const [form, setForm] = useState({
    email: "" as any,
    password: "" as any,
  });

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  let changelangS =
    language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold";
  const onSignInPress = async () => {
    if (!form.email || !form.password) {
      Alert.alert(t.error, t.missingFields);
      return;
    }

    try {
      await signIn(form.email, form.password, language);
      // Handle successful sign-in if needed
      router.replace("/(root)/(tabs)/Home");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(t.error, error.message);
      } else {
        Alert.alert(t.error, "Error during sign-in");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 bg-white">
          <View className="flex-1 bg-white">
            <View className="relative w-full h-[250px]">
              <Image
                source={images.signUpCar}
                className="z-0 w-full h-[250px]"
              />
              <LeagoMark />
              <TouchableOpacity
                className="absolute top-14 right-8 z-40"
                onPress={() => router.replace("/(root)/(tabs)/Home")}
              >
                <Image source={icons.backHome} className="w-8 h-8" />
              </TouchableOpacity>
              <Text
                className={`text-lg text-secondary-white font-JakartaSemiBold absolute bottom-7 left-5 ${changelangS}`}
              >
                {t.createAccount}
              </Text>
              <Text
                className={`text-sm text-secondary-white font-JakartaSemiBold absolute bottom-2 left-5 ${changelangS}`}
              >
                {t.fillData}
              </Text>
            </View>
            <View className="p-5">
              <View className="flex flex-1 w-full">
                <InputField
                  label={t.email}
                  placeholder={t.email}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.email}
                  value={form.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                />
                {/* <InputField
                  label={t.phone}
                  placeholder={t.phone}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.phone}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e })}
                /> */}
                <InputField
                  label={t.password}
                  placeholder={t.password}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.lock}
                  value={form.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                />
              </View>
              <CustomButton
                title={t.signIn}
                textStyle={`text-lg ${changelangS}`}
                onPress={onSignInPress}
                className="
                mt-5"
              />
              {/* Optional OAuth */}
              <OAuth />
              <Link
                href="/(auth)/sign-up"
                className=" mx-auto flex justify-center items-center mt-3"
              >
                <Text className={`text-black text-lg  mt-5 ${changelangS}`}>
                  {t.createAccount}{" "}
                </Text>
                <Text className={`text-primary-500 text-lg ${changelangS}`}>
                  {t.signIn}
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default signUp;
