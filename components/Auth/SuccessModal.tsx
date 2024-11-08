import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { icons } from "@/constants";

// Define a type for the props to make the modal reusable
type SuccessModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
};

const SuccessModal = ({
  isVisible,
  onClose,
  title,
  subtitle,
}: SuccessModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        {/* Image */}
        <Image
          source={icons.Illustration}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginBottom: 20,
          }}
        />

        {/* Title */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {title}
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: 14,
            color: "gray",
            textAlign: "center",
          }}
        >
          {subtitle}
        </Text>

        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          style={{
            marginTop: 20,
            backgroundColor: "#FF5C39",
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SuccessModal;
