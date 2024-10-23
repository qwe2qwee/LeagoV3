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
} from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/Auth/InputField";
import { icons, images, translationsignUp } from "@/constants";
import OAuth from "@/components/Auth/OAuth";
import { Link, router } from "expo-router";
import LeagoMark from "@/components/Auth/LeagoMark";
import { createUser } from "@/appwrite/apit";

// Define a type for the language
type Language = "en" | "ar";

const signUp = () => {
  const [language, setLanguage] = useState<Language>("ar"); // Simulating language toggle

  const t = translationsignUp[language]; // Choose the right translation

  let birthday = "1999-01-01" as any;
  let gender = "male" as any;
  let address = "unknown";

  // State for form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  let changelangS =
    language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold";

  // Handler for form field updates
  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const onSignUpPress = async () => {
    console.log(form); // Debug: Check the form content before sending

    try {
      const d = await createUser(
        form.email,
        form.password,
        form.name,
        form.phone,
        birthday,
        gender,
        address
      );
      console.log("User created successfully:", d);
    } catch (error) {
      console.error("Error during signup:", error);
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
                {/* Updated InputFields */}
                <InputField
                  label={t.name}
                  placeholder={t.name}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.person}
                  value={form.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                />
                <InputField
                  label={t.email}
                  placeholder={t.email}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.email}
                  value={form.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                />
                <InputField
                  label={t.phone}
                  placeholder={t.placeHol}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.phone}
                  value={form.phone}
                  maxLength={9}
                  onChangeText={(text) =>
                    handleInputChange("phone", `+966${text.trim()}`)
                  }
                />
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
                title={t.signUp}
                textStyle={`text-lg ${changelangS}`}
                onPress={onSignUpPress}
                className="mt-5"
              />
              {/* Optional OAuth */}
              <OAuth />
              <Link
                href="/(auth)/sign-in"
                className=" mx-auto flex justify-center items-center mt-3"
              >
                <Text className={`text-black text-lg mt-5 ${changelangS}`}>
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
