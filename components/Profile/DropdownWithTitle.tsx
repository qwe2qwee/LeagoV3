import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { addressRegion } from "@/constants/profilePage/addressChoices";
import { useFonts } from "expo-font";

type Language = "en" | "ar";

const DropdownWithTitle = () => {
  const [fontsLoaded] = useFonts({
    Zain: require("../../assets/fonts/Zain-Regular.ttf"),
  });
  const [language, setLanguage] = useState<Language>("ar");
  const regionTranslator = addressRegion[language];

  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="p-6 pb-0">
      <Text className="text-right font-ZainBold text-[#78828A]">{regionTranslator.chooseRegion}</Text>

      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#FF5C39" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        fontFamily="Zain"
        data={regionTranslator.regions}
        maxHeight={300}
        labelField="label"
        valueField="value"
        iconColor="#FF5C39"
        placeholder={ regionTranslator.chooseRegion}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: { label: string; value: string }) => {
          // Correct the type
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownWithTitle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 8,
    backgroundColor: "#F7F7F7",
    marginTop: 12,
    width: 320
  },

  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
