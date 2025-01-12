import React, { FC } from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  containerStyle?: string;
  inputStyle?: string;
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  containerStyle = "",
  inputStyle = "",
}) => {
  return (
    <View className={`w-full my-3 ${containerStyle}`}>
      <Text>{placeholder}</Text>
      <TextInput
        className={`border-b border-b-gray-300 p-2 rounded w-full ${inputStyle}`}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
};

export default CustomTextInput;
