import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { radioButton } from "@/constants/profilePage";
import useAuthStore from "@/store/useAuthStore";
import { useUserDetailsStore } from "@/store/UserDetailsStore";

type Gender = "male" | "female";

const RadioButton: React.FC = () => {
  const { language, user } = useAuthStore();
  const translator = radioButton.radio[language];
  const { details, setDetails } = useUserDetailsStore();

  // Ensure gender is initialized properly
  const [gender, setGender] = useState<Gender | undefined>(
    user?.details?.gender === "male" || user?.details?.gender === "female"
      ? user.details.gender
      : undefined
  );

  const handleGenderChange = (newGender: Gender) => {
    setGender(newGender);
    setDetails({ ...details, gender: newGender });
  };

  useEffect(() => {
    // Set initial gender from user details on mount
    if (
      user?.details?.gender === "male" ||
      user?.details?.gender === "female"
    ) {
      setGender(user.details.gender);
    } else {
      setGender(undefined);
    }
  }, [user]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 16,
        paddingBottom: 0,
      }}
    >
      <Text
        style={{ textAlign: "right", fontFamily: "ZainBold", color: "#78828A" }}
      >
        {translator.gender}
      </Text>
      <View
        style={{
          flexDirection: "row-reverse",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        {/* Male Option */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          onPress={() => handleGenderChange("male")}
        >
          <Text
            style={{
              fontFamily: "ZainBold",
              color: gender === "male" ? "#4CAF50" : "#B0B0B0",
            }}
          >
            {translator.male}
          </Text>
          <View style={{ position: "relative", width: 20, height: 20 }}>
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: gender === "male" ? "#4CAF50" : "transparent",
                borderRadius: 20,
              }}
            />
            {gender === "male" && (
              <Image
                source={radioButton.vector}
                resizeMode="contain"
                style={{
                  width: 12,
                  height: 12,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: [{ translateX: -6 }, { translateY: -6 }],
                }}
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Female Option */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          onPress={() => handleGenderChange("female")}
        >
          <Text
            style={{
              fontFamily: "ZainBold",
              color: gender === "female" ? "#4CAF50" : "#B0B0B0",
            }}
          >
            {translator.female}
          </Text>
          <View style={{ position: "relative", width: 20, height: 20 }}>
            <Image
              source={radioButton.unchecked}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor:
                  gender === "female" ? "#4CAF50" : "transparent",
                borderRadius: 20,
              }}
            />
            {gender === "female" && (
              <Image
                source={radioButton.vector}
                resizeMode="contain"
                style={{
                  width: 12,
                  height: 12,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: [{ translateX: -6 }, { translateY: -6 }],
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RadioButton;
