import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-primary-400";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustombillBtton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  textStyle,
  loading = false, // Add the loading prop with a default value of false
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-20 h-11 p-1 rounded-md  flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(
        bgVariant
      )} ${className} ${loading == true ? "h-14" : ""}
      `}
      disabled={loading} // Disable the button while loading
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" /> // Show loading indicator
      ) : (
        <View>
          {IconLeft && <IconLeft />}
          <Text
            className={`text-lg font-bold ${getTextVariantStyle(
              textVariant
            )} ${textStyle}`}
          >
            {title}
          </Text>
          {IconRight && <IconRight />}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustombillBtton;
