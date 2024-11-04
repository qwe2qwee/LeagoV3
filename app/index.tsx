import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import OTPComponent from "@/components/Auth/OTPComponent";
import useAuthStore from "@/store/useAuthStore";

const Home = () => {
  const { user, getCurrentUser, createUser, logout, loading, error } =
    useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text>{user?.email}</Text>
      <TouchableOpacity onPress={() => router.push("/SelectUsersDocs" as any)}>
        <Text>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
