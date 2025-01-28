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
import {
  icons,
  images,
  translationForget,
  translationsignUp,
  translationsLogin,
} from "@/constants";
import OAuth from "@/components/Auth/OAuth";
import { Link, router } from "expo-router";
import LeagoMark from "@/components/Auth/LeagoMark";
import useAuthStore from "@/store/useAuthStore";
import {
  isEmailExisting,
  isPhoneNumberExisting,
  sendOtpToEmail,
  sendOtpToPhone,
} from "@/lib/appwrite/apit";
import VerifictionEandP from "@/components/Auth/VerifictionEandP";
import ErrorModal from "@/components/ui/ErrorModal";

const signIn = () => {
  const { loading, language } = useAuthStore();
  const [form, setForm] = useState({ value: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const t = translationsLogin[language]; // Choose the right translation
  const tt = translationsignUp[language];

  const ttt = translationForget[language]; // Get translations based on current language

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChangeText = (value: string) => {
    setForm({ value });
  };

  const isPhone = true;

  const showError = (message: string, success: boolean) => {
    setErrorMessage(message);
    setIsSuccess(success);
    setErrorModalVisible(true);
  };

  const handleErrorModalClose = () => {
    setErrorModalVisible(false);
    setErrorMessage("");
  };

  const handleSendOtp = async () => {
    if (!form.value.trim()) {
      showError(t.missingFields, false);
      return;
    }

    const formattedValue = `+966${form.value.trim()}`;

    // Phone number validation
    const phoneRegex = /^\+966\d{9}$/; // Regex for +966 followed by 9 digits

    if (!phoneRegex.test(formattedValue)) {
      showError(t.invalidPhoneNumber, false);
      return;
    }
    try {
      setIsLoading(true);

      if (isPhone) {
        const phoneExists = await isPhoneNumberExisting(formattedValue);
        if (!phoneExists) {
          showError(ttt.errorPhoneNotFound, false);
          return;
        }
        const userIdFromPhone = await sendOtpToPhone(formattedValue);
        setUserId(userIdFromPhone);
      } else {
        const emailExists = await isEmailExisting(formattedValue);
        if (!emailExists) {
          showError(ttt.errorEmailNotFound, false);
          return;
        }
        await sendOtpToEmail(formattedValue);
      }

      setIsOtpModalVisible(true);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      showError(ttt.sendOtpError, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSuccess = () => {
    setIsOtpModalVisible(false);
    router.replace("/(tabs)");
  };

  let changelangS =
    language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold";

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
                onPress={() => router.replace("/(tabs)")}
              >
                <Image source={icons.backHome} className="w-8 h-8" />
              </TouchableOpacity>
              <Text
                className={`text-lg text-secondary-white font-JakartaSemiBold absolute bottom-7 left-5 ${changelangS}`}
              >
                {t.loginTitle}
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
                  label={tt.phone}
                  placeholder={tt.placeHol}
                  labelStyle={`text-black ${changelangS}`}
                  icon={icons.phone}
                  value={form.value}
                  onChangeText={handleChangeText}
                  maxLength={9}
                />
                <View className="w-full px-2 flex-row-reverse justify-start items-center">
                  <TouchableOpacity
                    className="flex-row px-3"
                    onPress={() => router.push("/(auth)/reset/email")}
                  >
                    <Text className="text-[#F61F1F] text-xs underline">
                      {t.forgotPassword}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <CustomButton
                title={t.signIn}
                textStyle={`text-lg ${changelangS}`}
                onPress={handleSendOtp}
                loading={isLoading || loading}
                className="mt-5"
              />
              {/* OTP Verification Modal */}
              {isOtpModalVisible && (
                <VerifictionEandP
                  ismodal={true}
                  form={{ value: form.value }}
                  userId={userId}
                  close={() => setIsOtpModalVisible(false)}
                  onSuccess={handleOtpSuccess}
                  isphone={isPhone}
                />
              )}
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
          <ErrorModal
            isVisible={errorModalVisible}
            message={errorMessage}
            onClose={handleErrorModalClose}
            isSecuss={isSuccess}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default signIn;
