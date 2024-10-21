import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/Auth/InputField";
import { icons, images, translationsignUp } from "@/constants";
import OAuth from "@/components/Auth/OAuth";
import { Link } from "expo-router";
import LeagoMark from "@/components/Auth/LeagoMark";

// Define a type for the language
type Language = "en" | "ar";

const signUp = () => {
  const [language, setLanguage] = useState<Language>("ar"); // Simulating language toggle

  const t = translationsignUp[language]; // Choose the right translation

  const [form, setForm] = useState({
    name: "" as any,
    email: "" as any,
    password: "" as any,
    phone: "" as any,
  });

  let changelangS =
    language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold";
  const onSignUpPress = async () => {
    console.log("Sign Up Pressed");
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
                  label={t.name}
                  placeholder={t.name}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.person}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e })}
                />
                <InputField
                  label={t.email}
                  placeholder={t.email}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e })}
                />
                <InputField
                  label={t.phone}
                  placeholder={t.phone}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.phone}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e })}
                />
                <InputField
                  label={t.password}
                  placeholder={t.password}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.lock}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e })}
                />
              </View>
              <CustomButton
                title={t.signUp}
                textStyle={`text-lg ${changelangS}`}
                onPress={onSignUpPress}
                className="
                mt-5"
              />
              {/* Optional OAuth */}
              <OAuth />
              <Link
                href="/(auth)/sign-in"
                className=" mx-auto flex justify-center items-center mt-3"
              >
                <Text className={`text-black text-lg  mt-5 ${changelangS}`}>
                  {t.alreadyAccount}
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
