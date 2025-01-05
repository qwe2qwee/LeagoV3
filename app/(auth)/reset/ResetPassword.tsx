import React, { useState } from "react";
import { Alert, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router"; // For navigation
import CustomButton from "@/components/ui/CustomButton";
import { translationReset } from "@/constants";
import InputField from "@/components/Auth/InputField";
import useAuthStore from "@/store/useAuthStore";
import { getPassword, ResetPasswordN } from "@/lib/appwrite/apit";

// Translations object for multilingual support

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, updateUserDetails, language } = useAuthStore(); // Access user, updater function, and language state

  const t = translationReset[language]; // Get translations based on selected language

  const showToast = () => {
    //  Toast.show({
    //    type: "success",
    //    text1: t.successToastTitle,
    //    text2: t.successToastMessage,
    //  });
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setErrorMessage("");
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      showError(t.errorEmptyFields);
      return;
    }

    if (newPassword !== confirmPassword) {
      showError(t.errorMismatch);
      return;
    }

    if (newPassword.length < 6) {
      showError(t.errorShortPassword);
      return;
    }

    setIsLoading(true);

    try {
      const oldPassword = await getPassword(user?.$id || "");
      if (!oldPassword) {
        throw new Error(t.errorOldPasswordMissing);
      }

      console.log("Old Password:", oldPassword);

      await ResetPasswordN(newPassword, oldPassword as any);

      showToast();

      router.replace("/(tabs)/Home");
    } catch (error: any) {
      console.error("Password reset failed:", error.message || error);
      showError(error.message || t.errorResetFailed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.title}</Text>
      <InputField
        label="Password"
        placeholder={t.newPasswordPlaceholder}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text.trim())}
      />

      <InputField
        label="Password"
        placeholder={t.confirmPasswordPlaceholder}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text.trim())}
      />

      <CustomButton
        title={t.confirmButton}
        onPress={handleResetPassword}
        loading={isLoading}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
});

export default ResetPassword;
