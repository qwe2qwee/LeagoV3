import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import OTPComponent from "@/components/Auth/OTPComponent";
import useAuthStore from "@/store/useAuthStore";

const Home = () => {
  const {
    user,
    getCurrentUser,
    createUser,
    logout,
    loading,
    error,
    updateLocation,
  } = useAuthStore();

  // Get current user and start location updates
  useEffect(() => {
    getCurrentUser();
    startUpdatingLocation();
  }, []);

  // Array of coordinates around Jeddah, Saudi Arabia
  const predefinedLocations = [
    { latitude: 21.4858, longitude: 39.1925 }, // Central Jeddah
    { latitude: 21.5569, longitude: 39.1796 }, // North Jeddah
    { latitude: 21.4225, longitude: 39.8262 }, // East Jeddah
    { latitude: 21.2854, longitude: 39.2376 }, // South Jeddah
    { latitude: 21.6174, longitude: 39.1565 }, // Northwest Jeddah
  ];

  // Function to pick a random location from the predefined set
  function getRandomLocation() {
    const randomIndex = Math.floor(Math.random() * predefinedLocations.length);
    return predefinedLocations[randomIndex];
  }

  // Function to update location with a random predefined coordinate
  function startUpdatingLocation() {
    const { latitude, longitude } = getRandomLocation();
    // Call the updateLocation function from the store
    updateLocation(latitude, longitude);
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white gap-6">
      <Text>{user?.email}</Text>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/sign-in" as any)}>
        <Text>sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
