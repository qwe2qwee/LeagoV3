import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import useAuthStore from "@/store/useAuthStore";
import { icons } from "@/constants";

interface ErrorModalProps {
  errorType: "invalidFile" | "uploadFailed" | "fileSize" | "fileType";
  isVisible: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

const ModalError = ({
  errorType,
  isVisible,
  onClose,
  onRetry,
}: ErrorModalProps) => {
  const { language } = useAuthStore();
  //   const language = "en";

  // Bilingual error messages
  const messages = {
    en: {
      invalidFile: "you have to add docs identity or license",
      uploadFailed: "Upload failed. Please try again",
      fileSize: "you have to add docs identity and license",
      fileType: "Only PDF and images are allowed",
    },
    ar: {
      invalidFile: "يجب اضافة مستندات الهوية و الرخصة",
      uploadFailed: "فشل التحميل. يرجى المحاولة مرة أخرى",
      fileSize: "يجب اضافة مستندات الهوية و الرخصة",
      fileType: "يُسمح فقط بملفات PDF والصور",
    },
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.6}
      style={styles.modal}
    >
      <View
        style={[
          styles.container,
          language === "ar" && { flexDirection: "row-reverse" },
        ]}
      >
        {/* Warning Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={icons.Danger}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text
            style={[styles.title]}
            className={` ${
              language === "ar"
                ? "text-right font-ZainBold"
                : "text-left font-MontserratBold"
            }`}
          >
            {language === "ar" ? "خطأ" : "Error"}
          </Text>

          <Text
            style={[styles.message]}
            className={` ${
              language === "ar"
                ? "text-right font-ZainMedium"
                : "text-left font-Montserrat"
            }`}
          >
            {messages[language][errorType]}
          </Text>

          {/* Buttons */}
          <View
            style={[
              styles.buttonContainer,
              language === "ar" && { flexDirection: "row-reverse" },
            ]}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text
                style={styles.buttonText}
                className={` ${
                  language === "ar"
                    ? "text-right font-ZainMedium"
                    : "text-left font-Montserrat"
                }`}
              >
                {language === "ar" ? "إغلاق" : "Close"}
              </Text>
            </TouchableOpacity>

            {onRetry && (
              <TouchableOpacity
                onPress={onRetry}
                style={styles.retryButton}
                className="bg-primary-400"
              >
                <Text
                  style={styles.buttonText}
                  className={` ${
                    language === "ar"
                      ? "text-right font-ZainMedium"
                      : "text-left font-Montserrat"
                  }`}
                >
                  {language === "ar" ? " الذهاب للاضافة" : "go to add"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 15,
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#dc2626",
  },
  message: {
    fontSize: 16,
    marginBottom: 15,
    color: "#4b5563",
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  closeButton: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default ModalError;
