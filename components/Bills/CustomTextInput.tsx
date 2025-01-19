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
    <View
      className={`w-full bg-[#F5F5F5] rounded-full   my-3 ${containerStyle}`}
    >
      <TextInput
        className={` m-auto p-3 rounded w-full ${inputStyle}`}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
};

export default CustomTextInput;
