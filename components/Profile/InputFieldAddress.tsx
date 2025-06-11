import { View, Text, TextInput } from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";
import useAuthStore from "@/store/useAuthStore";

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
  const { language } = useAuthStore();

  return (
    <View className="justify-center items-end p-6 pb-0">
      <Text
        className={` text-[#78828A] ${
          language === "ar"
            ? "font-ZainBold text-right"
            : "font-MontserratBold text-left"
        }  ${labelStyle} `}
      >
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
