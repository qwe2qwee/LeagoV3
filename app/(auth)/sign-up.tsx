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
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ReactNativeModal from "react-native-modal";
import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/Auth/InputField";
import { icons, images, translationsignUp } from "@/constants";
import OAuth from "@/components/Auth/OAuth";
import { Link, router } from "expo-router";
import LeagoMark from "@/components/Auth/LeagoMark";
import {
  getLocalizedErrorMessage,
  isEmailExisting,
  isPhoneNumberExisting,
} from "@/lib/appwrite/apit";
import { UpdatePhoneNumberAndSendOTP } from "@/lib/UpdatePhoneNumberAndSendOTP";
import OTPComponent from "@/components/Auth/OTPComponent";
import useAuthStore from "@/store/useAuthStore";

const signUp = () => {
  const { language, user, createUser } = useAuthStore();
  const t = translationsignUp[language];

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const birthday = "1999-01-01";
  const gender = "other";
  const address = "unknown";
  const changelangS =
    language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold";

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleOtpSubmit = async (verify: string) => {
    if (verify === "ok") {
      try {
        setLoading(true);
        const newUser = await createUser(
          form.email,
          form.password,
          form.name,
          form.phone,
          birthday,
          gender,
          address,
          language
        );
        console.log("User created successfully:", newUser);
        setForm({ name: "", email: "", password: "", phone: "" });
        setModalVisible(false);
        router.replace("/(tabs)");
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(t.error, error.message);
        } else {
          Alert.alert(t.error, "Error during signup");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRsendOtp = async () => {
    try {
      setLoading(true);
      await UpdatePhoneNumberAndSendOTP(form.phone, language);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(t.error, error.message);
      } else {
        Alert.alert(t.error, "Failed to resend OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.password || !form.phone) {
      Alert.alert(t.error, t.missingFields);
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      Alert.alert(t.error, t.invalidEmail);
      return false;
    }
    if (form.phone.length !== 13) {
      Alert.alert(t.error, t.invalidPhone);
      return false;
    }
    if (form.password.length < 8) {
      Alert.alert(t.error, t.weakPassword); // Add this translation to handle weak password
      return false;
    }
    return true;
  };

  const onSignUpPress = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (await isEmailExisting(form.email)) {
        throw new Error(getLocalizedErrorMessage("emailExists", language));
      }
      if (await isPhoneNumberExisting(form.phone)) {
        throw new Error(
          getLocalizedErrorMessage("phoneNumberExists", language)
        );
      }

      await UpdatePhoneNumberAndSendOTP(form.phone, language);
      setModalVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(t.error, error.message);
      } else {
        Alert.alert(t.error, "Error during signup");
      }
    } finally {
      setLoading(false);
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
            {loading && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10,
                }}
              >
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}
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
                loading={loading}
                className="mt-5"
                disabled={loading}
              />
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
          <ReactNativeModal
            isVisible={isModalVisible}
            onBackButtonPress={() => setModalVisible(false)}
          >
            <View className="bg-white p-5 rounded-lg">
              <OTPComponent
                closeModal={() => setModalVisible(false)}
                onVerifyOTP={handleOtpSubmit}
                onResendOTP={handleRsendOtp}
                otpLength={4}
                emailORPhoneNumber={form.phone}
                language={language}
              />
            </View>
          </ReactNativeModal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default signUp;
