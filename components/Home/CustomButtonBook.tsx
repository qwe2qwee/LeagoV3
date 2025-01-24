import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
  title: string; // Button text
  onPress: () => void; // Function to execute on button press
  disabled?: boolean; // Whether the button is disabled
  textStyle?: string | object; // Additional text styles
  className?: string | object; // Additional container styles
}

const CustomButtonBook: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  textStyle,
  className,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        className,
        disabled ? styles.disabledButton : styles.enabledButton,
      ]}
    >
      <Text style={[styles.text]}>{title}</Text>
    </Pressable>
  );
};

export default CustomButtonBook;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  enabledButton: {
    backgroundColor: "#FF5C39",
  },
  disabledButton: {
    backgroundColor: "#B0B0B0",
  },
  text: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
