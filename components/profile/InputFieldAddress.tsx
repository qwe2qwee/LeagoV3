import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";

const InputFieldAddress = ({
  label,
  labelStyle,
  containerStyle,
  inputStyle,
  placeholder,
  maxLength,
  onChangeText,
  ...props
}: InputFieldProps) => {
  return (
    <View className="justify-center items-end p-6 pb-0">
      <Text className={`text-right font-ZainBold text-[#78828A] ${labelStyle}`}>
        {label}
      </Text>
      <View
        className={`items-end justify-center w-80 h-12 mt-3 rounded-xl bg-[#F7F7F7] ${containerStyle}`}
      >
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          maxLength={maxLength}
          className={`pr-4 font-ZainRegular text-[#9CA4AB] ${inputStyle}  `}
        />
      </View>
    </View>
  );
};

export default InputFieldAddress;
