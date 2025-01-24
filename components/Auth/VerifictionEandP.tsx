import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { icons, translationsVerificationForgot } from "../../constants";
import useAuthStore from "@/store/useAuthStore";
import {
  completePasswordReset,
  getUserIdByPhoneOrEmail,
  sendOtpToEmail,
  sendOtpToPhone,
  verifyOtpAndResetPassword,
} from "@/lib/appwrite/apit";
import CustomButton from "../ui/CustomButton";
import CustomOtpInputs from "./CustomOtpInputs";
import ErrorModal from "../ui/ErrorModal";

interface VerificationProps {
  ismodal: boolean;
  form: {
    phone?: string;
    email?: string;
    [key: string]: any;
  };
  onSuccess?: () => void;
  isphone: boolean;
  close: () => void;
  userId?: string;
  navigateToReset?: string;
}

const VerifictionEandP: React.FC<VerificationProps> = ({
  ismodal,
  form,
  onSuccess,
  isphone,
  close,
  userId,
  navigateToReset = "/ResetPassword",
}) => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSecuss, setIsSecuss] = useState(false);
  const [hasResentOtp, setHasResentOtp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { language, getCurrentUser } = useAuthStore();

  const t = translationsVerificationForgot[language]; // Dynamic translations based on language
  const identifier = isphone ? `+966${form?.value}` : form?.value;

  const showError = (message: string) => setError(message);
  const clearError = () => setError(null);

  const handleResendOtp = async () => {
    if (hasResentOtp) return;

    try {
      if (isphone) {
        await sendOtpToPhone(identifier!);
      } else {
        await sendOtpToEmail(identifier!);
      }
      setHasResentOtp(true);
      setIsSecuss(true);
      showError(t.codeResent);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setIsSecuss(false);
      showError(t.resendOtpError);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      setIsSecuss(false);
      showError(t.fullOtpRequired);

      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      let userIdToVerify = userId as any;

      if (!userIdToVerify) {
        userIdToVerify = await getUserIdByPhoneOrEmail(identifier!);
        if (!userIdToVerify) {
          setIsSecuss(false);
          showError(t.userNotFound);
          return;
        }
      }

      if (isphone) {
        await verifyOtpAndResetPassword(userIdToVerify, otp);
      } else {
        await completePasswordReset(userIdToVerify, otp);
      }

      setIsSecuss(true);
      showError(t.otpSuccess);
      await getCurrentUser();

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setIsSecuss(false);
      showError(t.otpError);
    } finally {
      setIsSubmitting(false);
      setHasResentOtp(false);
      setOtp("");
    }
  };

  const onClose = () => {
    clearError();
    setHasResentOtp(false);
    close();
  };

  return (
    <Modal
      isVisible={ismodal}
      animationIn="fadeIn"
      onBackdropPress={onClose}
      backdropTransitionOutTiming={0}
    >
      <ScrollView>
        <View className="w-full h-auto justify-start items-center bg-white rounded-lg p-6 shadow-lg">
          <View className="w-full flex flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={onClose} disabled={isSubmitting}>
              <Image source={icons.close} className="w-6 h-6" />
            </TouchableOpacity>
          </View>

          <Image
            source={icons.sendpassLogo}
            resizeMode="contain"
            className="w-36 h-48 mb-6"
          />

          <Text className="text-xl text-primary font-bold text-center mb-2">
            {isphone ? t.verifyPhone : t.verifyEmail}
          </Text>

          <Text className="text-base text-textLight text-center mb-2">
            {isphone ? t.otpPromptPhone : t.otpPromptEmail}
          </Text>

          <Text className="text-base text-textLight font-semibold text-center mb-4">
            {identifier}
          </Text>

          <CustomOtpInputs
            numberOfInputs={6}
            onChangeOtp={(value) => setOtp(value)}
          />

          <CustomButton
            title={t.continue}
            className="w-full py-3 bg-primary rounded-lg shadow-md mb-4"
            onPress={handleVerifyOtp}
            textStyle="text-white text-lg font-semibold"
            loading={isSubmitting}
          />

          <TouchableOpacity
            disabled={hasResentOtp}
            onPress={handleResendOtp}
            className="mt-4"
          >
            <Text
              className={`text-center text-base ${
                hasResentOtp ? "text-gray-500" : "text-primary underline"
              }`}
            >
              {hasResentOtp ? t.codeResent : t.resendCode}
            </Text>
          </TouchableOpacity>
        </View>

        <StatusBar backgroundColor="#fff" style="dark" />

        <ErrorModal
          isVisible={!!error}
          message={error || ""}
          onClose={clearError}
          isSecuss={isSecuss}
          language={language}
        />
      </ScrollView>
    </Modal>
  );
};

export default VerifictionEandP;
