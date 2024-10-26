import { View, Text } from "react-native";
import React from "react";
import { signOut } from "@/lib/appwrite/apit";

const profile = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text onPress={() => signOut()}>profile</Text>
    </View>
  );
};

export default profile;
