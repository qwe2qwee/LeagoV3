import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { radioButton } from "@/constants/profilePage";
import useAuthStore from "@/store/useAuthStore";
import { useUserDetailsStore } from "@/store/UserDetailsStore";
import { Gender } from "@/constants";

const RadioButton: React.FC = () => {
  const { language, user } = useAuthStore();
  const translator = radioButton.radio[language];
  const { details, setDetails } = useUserDetailsStore();

  const [gender, setGender] = useState<Gender>(
    user?.details?.gender || "other"
  );

  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);
    setDetails({ ...details, gender: newGender });
  };

  const GenderOption = ({ genderType }: { genderType: Gender }) => (
    <TouchableOpacity
      onPress={() => handleGenderChange(genderType)}
      style={[
        styles.optionContainer,
        gender === genderType && styles.selectedOption,
      ]}
      accessibilityRole="radio"
      accessibilityState={{ checked: gender === genderType }}
      accessibilityLabel={`Select ${translator[genderType]} gender`}
    >
      <Text
        style={[
          styles.optionText,
          gender === genderType && styles.selectedText,
        ]}
      >
        {translator[genderType]}
      </Text>
      <View style={styles.radioIndicator}>
        <View
          style={[
            styles.radioOuter,
            gender === genderType && styles.radioOuterSelected,
          ]}
        >
          {gender === genderType && (
            <Image
              source={radioButton.vector}
              resizeMode="contain"
              style={styles.radioInner}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const userGender = user?.details?.gender;
    setGender(
      userGender && ["male", "female", "other"].includes(userGender)
        ? userGender
        : "other"
    );
  }, [user?.details?.gender]);

  return (
    <View style={styles.container}>
      <Text
        className={` text-[#78828A] w-full  ${
          language === "ar"
            ? "font-ZainBold text-right"
            : "font-MontserratBold text-left"
        }   `}
      >
        {translator.gender}
      </Text>
      <View style={styles.optionsContainer}>
        <GenderOption genderType="male" />
        <GenderOption genderType="female" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,
  },
  label: {
    textAlign: "right",
    fontFamily: "ZainBold",
    color: "#78828A",
    marginBottom: 16,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    gap: 7,
  },
  optionContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: "#F5F5F5",
  },
  optionText: {
    fontFamily: "ZainBold",
    color: "#B0B0B0",
    fontSize: 14,
  },
  selectedText: {
    color: "#FF5C39",
  },
  radioIndicator: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B0B0B0",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#FF5C39",
    backgroundColor: "#FF5C39",
  },
  radioInner: {
    width: 12,
    height: 12,
  },
});

export default RadioButton;
