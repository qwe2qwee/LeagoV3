import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import OTPComponent from "@/components/Auth/OTPComponent";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <TouchableOpacity onPress={() => router.push("/(auth)/sign-up" as any)}>
        <Text>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
