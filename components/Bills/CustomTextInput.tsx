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
    <View className={`bg-[#Fff] rounded-full my-3 w-auto  ${containerStyle} `}>
      <TextInput
        className={` m-auto p-4 rounded w-full ${inputStyle}`}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
};

export default CustomTextInput;
