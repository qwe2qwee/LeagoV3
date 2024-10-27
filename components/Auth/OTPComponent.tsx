import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import CustomButton from "../ui/CustomButton";

interface OTPComponentProps {
  onVerifyOTP: (otp: string) => void;
  onResendOTP: () => void;
  otpLength?: number; // Default to 4
  language?: "en" | "ar";
  emailORPhoneNumber: string;
}

const OTPComponent: React.FC<OTPComponentProps> = ({
  onVerifyOTP,
  onResendOTP,
  otpLength = 4,
  language = "ar",
  emailORPhoneNumber,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Choose font based on the language
  const fontClass =
    language === "ar" ? "font-ZainMedium" : "font-MontserratMedium";

  const handleChange = async (text: string, index: number) => {
    try {
      if (!inputRefs.current[index]) {
        console.error(
          "OTPComponent: handleChange: inputRefs.current[index] is null."
        );
        return;
      }

      if (text.length > 1) return;

      const updatedOtp = [...otp];
      updatedOtp[index] = text;
      setOtp(updatedOtp);

      // Move focus to the next input if a digit is entered
      if (text && index < otpLength - 1) {
        inputRefs.current[index + 1]?.focus?.();
      }

      // If the last digit is entered, verify OTP automatically
      if (updatedOtp.every((digit) => digit !== "")) {
        handleVerify(updatedOtp.join(""));
      }
    } catch (error) {
      console.error("OTPComponent: handleChange: ", error);
    }
  };

  const handleKeyPress = (
    event: { nativeEvent: { key: string } },
    index: number
  ) => {
    try {
      const { key } = event.nativeEvent;

      if (key === "Backspace" && !otp[index] && index > 0) {
        // Move focus to the previous input if backspace is pressed and current input is empty
        inputRefs.current[index - 1]?.focus?.();
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = ""; // Clear the previous input
        setOtp(updatedOtp);
      }
    } catch (error) {
      console.error("OTPComponent: handleKeyPress: ", error);
    }
  };

  const handleVerify = async (enteredOtp: string) => {
    try {
      const response = await fetch(
        "https://api.authentica.sa/api/sdk/v1/verifyOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Authorization":
              "$2y$10$P7V123TDwDF5bGBqP3D3f.LXr8NyXfu5Vo6CAilmL66tHS9w6jPPq", // Replace with actual key
          },
          body: JSON.stringify({
            phone: emailORPhoneNumber, // Assuming 'form' contains phone number
            otp: enteredOtp,
          }),
        }
      );

      if (enteredOtp.length === otpLength) {
        setError(null);
        if (response.ok) {
          onVerifyOTP("ok");
        }
      } else {
        setError(
          language === "ar"
            ? "يرجى إدخال رمز التحقق بالكامل."
            : "Please complete the OTP."
        );
      }
    } catch (error) {
      console.error("OTPComponent: handleVerify: ", error);
    }
  };

  return (
    <View className="bg-secondary-white justify-center items-center p-4">
      <Text
        className={`text-lg font-bold mb-4 ${language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold"}`}
      >
        {language === "ar" ? "أدخل رمز التحقق" : "Enter OTP"}
      </Text>
      <View
        className={`text-sm mb-4 flex justify-center items-center  ${language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold"}`}
      >
        <Text numberOfLines={1}>
          {language === "ar" ? (
            <>لقد أرسلنا لك رمز التحقق المكون من 4 أرقام إلى </>
          ) : (
            <>We have just sent you a 4-digit code via your </>
          )}
        </Text>

        <View className=" w-full flex-row justify-center items-center h-4 ">
          <Text numberOfLines={1} className="text-primary-400 mx-auto">
            {emailORPhoneNumber}
          </Text>
        </View>
      </View>

      <View className="flex-row space-x-2 mb-2">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            keyboardType="number-pad"
            maxLength={1}
            className={`border rounded-md p-3 mx-2 w-12 h-12 text-center text-primary-400 border-primary-400 ${language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold"}`}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>

      {error && (
        <Text
          className={`text-red-500 mb-2 ${language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold"}`}
        >
          {error}
        </Text>
      )}

      <CustomButton
        title={language === "ar" ? "تحقق" : "Verify"}
        onPress={() => handleVerify(otp.join(""))}
        className={`mt-8 ${language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold"}`}
      />

      <TouchableOpacity onPress={onResendOTP} className="mt-4">
        <Text
          className={`text-primary-300 underline ${language === "ar" ? "font-ZainBoldn" : "font-MontserratSemiBold"}`}
        >
          {language === "ar" ? "إعادة إرسال رمز التحقق" : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPComponent;
