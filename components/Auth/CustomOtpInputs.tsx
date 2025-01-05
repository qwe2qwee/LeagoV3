import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native";
import { icons } from "@/constants";

interface CustomOtpInputProps {
  numberOfInputs?: number;
  onChangeOtp: (otp: string) => void;
  onVerifyOtp?: (otp: string) => void; // Optional, triggered when OTP is fully entered
  onResendOtp?: () => void;
  closeModal?: () => void;
  language?: "en" | "ar";
}

const CustomOtpInputs: React.FC<CustomOtpInputProps> = ({
  numberOfInputs = 4,
  onChangeOtp,
  onVerifyOtp,
  onResendOtp,
  closeModal,
  language = "en",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(numberOfInputs).fill(""));
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Font selection based on language
  const fontClass =
    language === "ar" ? "font-ZainBoldn" : "font-MontserratMedium";

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return; // Prevent multi-character input

    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);
    onChangeOtp(updatedOtp.join(""));

    // Move focus to the next input if text is entered
    if (text && index < numberOfInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Automatically verify if all inputs are filled
    if (updatedOtp.every((digit) => digit !== "") && onVerifyOtp) {
      onVerifyOtp(updatedOtp.join(""));
    }
  };

  const handleKeyPress = (
    event: { nativeEvent: { key: string } },
    index: number
  ) => {
    const { key } = event.nativeEvent;

    // Handle backspace
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = "";
      setOtp(updatedOtp);
    }
  };

  return (
    <View style={styles.container}>
      {closeModal && (
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Image source={icons.close} style={styles.closeIcon} />
        </TouchableOpacity>
      )}

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className={`border rounded-md p-3 mx-1 w-12 h-12 text-center text-primary-400 border-primary-400 ${language === "ar" ? "font-ZainBoldn" : "font-MontserratMedium"}`}
          />
        ))}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {onResendOtp && (
        <TouchableOpacity onPress={onResendOtp} style={styles.resendButton}>
          <Text style={[styles.resendText, { fontFamily: fontClass }]}>
            {language === "ar" ? "إعادة إرسال رمز التحقق" : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  closeIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  inputBox: {
    width: 40,
    height: 45,
    marginHorizontal: 8,
    fontSize: 20,
    textAlign: "center",
    borderBottomWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
  },
  resendButton: {
    marginTop: 16,
  },
  resendText: {
    color: "#007BFF",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});

export default CustomOtpInputs;
