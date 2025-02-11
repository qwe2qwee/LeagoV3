import useAuthStore from "@/store/useAuthStore";
import React from "react";
import { View, Text } from "react-native";

// 1. Define proper types for translations
type TranslationKeys = {
  daily: string;
  weekly: string;
  monthly: string;
  notAvailable: string;
  n: string;
};

type RentType = {
  daily?: { availability: boolean; price: number };
  weekly?: { availability: boolean; price: number };
  monthly?: { availability: boolean; price: number };
};

// 2. Improved type safety for the helper function
const getAvailableRentType = (
  rentType: RentType,
  t: TranslationKeys
): { type: string; price: string | number } => {
  // 3. Handle null/undefined rentType immediately
  if (!rentType) {
    return { type: t.notAvailable, price: t.n };
  }

  // 4. Check availability in logical order (daily -> weekly -> monthly)
  if (rentType.daily?.availability) {
    return { type: t.daily, price: rentType.daily.price };
  }
  if (rentType.weekly?.availability) {
    return { type: t.weekly, price: rentType.weekly.price };
  }
  if (rentType.monthly?.availability) {
    return { type: t.monthly, price: rentType.monthly.price };
  }

  // 5. Explicit return type for fallback
  return { type: t.notAvailable, price: t.n };
};

interface AvailableRentTypeProps {
  rentType?: RentType; // Made optional with ?
  containerStyle?: object;
  textStyle?: object;
}

// 6. Memoize translations to prevent recreation on every render
const TRANSLATIONS = {
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

const AvailableRentType: React.FC<AvailableRentTypeProps> = ({
  rentType,
  containerStyle,
  textStyle,
}) => {
  const { language } = useAuthStore();
  const t = TRANSLATIONS[language];

  // 7. Handle undefined rentType
  const availableRentType = getAvailableRentType(rentType ?? {}, t);

  // 8. Consolidated text style configuration
  const textClass =
    language === "ar"
      ? "font-ZainMedium text-right"
      : "font-Montserrat text-left";

  const boldTextClass =
    language === "ar"
      ? "font-ZainBold text-right"
      : "font-MontserratBold text-left";

  return (
    <View style={containerStyle}>
      {availableRentType.type !== t.notAvailable ? (
        <Text style={[{ color: "green" }, textStyle]} className={textClass}>
          {availableRentType.price}/{availableRentType.type}
        </Text>
      ) : (
        <Text style={[{ color: "gray" }, textStyle]} className={boldTextClass}>
          {availableRentType.type}
        </Text>
      )}
    </View>
  );
};

export default AvailableRentType;
