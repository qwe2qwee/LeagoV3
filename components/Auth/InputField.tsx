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
import React, { useState } from "react";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  placeholder,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <View className="my-2 w-full">
      <Text className={` text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
        {label}
      </Text>
      <View
        className={`flex flex-row items-center justify-start relative border border-neutral-100 rounded-xl focus:border-primary-500 bg-slate-100 ${containerStyle}`}
      >
        {icon && (
          <Image source={icon} className={`w-6 h-6 ml-3 ${iconStyle}`} />
        )}
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          className={`rounded-xl p-4 text-[15px] font-JakartaSemiBold text-left  flex-1 ${inputStyle}  `}
        />
      </View>
    </View>
  );
};

export default InputField;
