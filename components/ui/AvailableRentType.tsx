import useAuthStore from "@/store/useAuthStore";
import React from "react";
import { View, Text } from "react-native";

type RentType = {
  daily?: { availability: boolean; price: number };
  weekly?: { availability: boolean; price: number };
  monthly?: { availability: boolean; price: number };
};

const getAvailableRentType = (rentType: RentType, t: any) => {
  if (rentType?.monthly?.availability) {
    return { type: t.monthly, price: rentType.monthly.price };
  } else if (rentType?.weekly?.availability) {
    return { type: t.weekly, price: rentType.weekly.price };
  } else if (rentType?.daily?.availability) {
    return { type: t.daily, price: rentType.daily.price };
  } else {
    return { type: t.notAvailable, price: t.n }; // Default to N/A
  }
};

interface AvailableRentTypeProps {
  rentType: RentType;
  containerStyle?: object; // Optional style for container
  textStyle?: object; // Optional style for text
}

const AvailableRentType: React.FC<AvailableRentTypeProps> = ({
  rentType,
  containerStyle,
  textStyle,
}) => {
  const { language } = useAuthStore();

  const translations = {
    en: {
      daily: "daily",
      weekly: "weekly",
      monthly: "monthly",
      notAvailable: "Not Available",
      n: "N/A",
    },
    ar: {
      daily: "يومي",
      weekly: "أسبوعي",
      monthly: "شهري",
      notAvailable: "غير متوفر",
      n: "غير متاح",
    },
  };

  const t = translations[language];

  const availableRentType = getAvailableRentType(rentType, t);

  return (
    <View style={containerStyle}>
      {availableRentType.type !== t.notAvailable ? (
        <Text style={[{ color: "green" }, textStyle]}>
          {availableRentType.price}/{availableRentType.type}
        </Text>
      ) : (
        <Text style={[{ color: "gray" }, textStyle]}>
          {availableRentType.type}
        </Text>
      )}
    </View>
  );
};

export default AvailableRentType;
