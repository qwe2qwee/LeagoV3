import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, translationForget } from "../../constants";
import { router } from "expo-router";

import CustomButton from "../ui/CustomButton";
import useAuthStore from "@/store/useAuthStore";
import {
  isEmailExisting,
  isPhoneNumberExisting,
  sendOtpToEmail,
  sendOtpToPhone,
} from "@/lib/appwrite/apit";
import InputField from "./InputField";
import VerifictionEandP from "./VerifictionEandP";
import ErrorModal from "../ui/ErrorModal";

interface ForgetResetProps {
  type: "email" | "phone";
  onSuccessRedirect?: string;
}

const ForgetReset: React.FC<ForgetResetProps> = ({
  type,
  onSuccessRedirect = "/(auth)", // Default redirect route
}) => {
  const [form, setForm] = useState({ value: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [userId, setUserId] = useState("");

  const { language } = useAuthStore(); // Assuming language state is in user store

  const isPhone = type === "phone";
  const t = translationForget[language]; // Get translations based on current language

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const showError = (message: string, success: boolean) => {
    setErrorMessage(message);
    setIsSuccess(success);
    setErrorModalVisible(true);
  };

  const handleErrorModalClose = () => {
    setErrorModalVisible(false);
    setErrorMessage("");
  };

  const handleChangeText = (value: string) => {
    setForm({ value });
  };

  const handleBackPress = () => {
    router.replace("/(auth)/sign-in");
    setErrorModalVisible(false);
  };

  const handleSendOtp = async () => {
    if (!form.value.trim()) {
      showError(t.errorEmptyField, false);
      return;
    }

    setIsLoading(true);
    const formattedValue = isPhone
      ? `+966${form.value.trim()}`
      : form.value.trim();

    try {
      if (isPhone) {
        const phoneExists = await isPhoneNumberExisting(formattedValue);
        if (!phoneExists) {
          showError(t.errorPhoneNotFound, false);
          return;
        }
        const userIdFromPhone = await sendOtpToPhone(formattedValue);
        setUserId(userIdFromPhone);
      } else {
        const emailExists = await isEmailExisting(formattedValue);
        if (!emailExists) {
          showError(t.errorEmailNotFound, false);
          return;
        }
        await sendOtpToEmail(formattedValue);
      }

      setIsOtpModalVisible(true);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      showError(t.sendOtpError, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSuccess = () => {
    setIsOtpModalVisible(false);
    setErrorModalVisible(true);
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <SafeAreaView style={{ flex: 1 }} className="bg-secondary-white">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          keyboardShouldPersistTaps="handled"
          className="w-full h-full bg-secondary px-6"
        >
          {/* Back Button */}
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              paddingHorizontal: 10,
              paddingTop: 5,
              paddingBottom: 50,
            }}
          >
            <TouchableOpacity
              onPress={handleBackPress}
              className="bg-white rounded-full shadow-md p-3"
            >
              <Image
                source={icons.backArrow}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Page Content */}
          <Image
            source={icons.smartphone}
            resizeMode="contain"
            tintColor={"#FF5C39"}
            className="w-52 h-48"
          />
          <Text className="font-sans-arabic-bold text-textDark mt-6 mb-12">
            {isPhone ? t.enterPhone : t.enterEmail}
          </Text>
          <InputField
            label={isPhone ? "" : ""}
            placeholder={isPhone ? t.phoneLabel : t.emailLabel}
            value={form.value}
            onChangeText={handleChangeText}
            maxLength={isPhone ? 9 : undefined}
          />
          <View className="w-full px-2 pr-3 pt-1 flex-row-reverse justify-start items-center mb-20 bg ">
            <TouchableOpacity
              className="flex-row px-3"
              onPress={() =>
                router.replace(
                  isPhone ? "/(auth)/reset/email" : "/(auth)/reset/phone"
                )
              }
            >
              <Text className="text-[#F61F1F] text-xs">
                {isPhone ? t.emailLabel : t.phoneLabel}
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            title={t.continue}
            loading={isLoading}
            onPress={handleSendOtp}
          />
        </ScrollView>
        {/* OTP Verification Modal */}
        {isOtpModalVisible && (
          <VerifictionEandP
            ismodal={isOtpModalVisible}
            form={{ value: form.value }}
            userId={userId}
            close={() => setIsOtpModalVisible(false)}
            onSuccess={handleOtpSuccess}
            isphone={isPhone}
          />
        )}
        {/* Error Modal */}
        <ErrorModal
          isVisible={errorModalVisible}
          message={errorMessage}
          onClose={handleErrorModalClose}
          isSecuss={isSuccess}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgetReset;
