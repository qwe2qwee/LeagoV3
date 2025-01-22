import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";

// Custom TopBar Component
interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="flex flex-row justify-between items-center px-4 py-2 w-5/6 mt-0  ">
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          className="bg-white rounded-full shadow-md p-3"
        >
          <Image
            source={icons.backArrow}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </Pressable>

        {/* Title */}
        <Text className="text-lg font-bold text-black  w-9/12 text-center">
          {title}
        </Text>

        {/* Support Page Button */}
        <TouchableOpacity
          onPress={() => router.push("/screens/profilePage/ContactUs")}
          className="rounded-full bg-white p-2"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 }, // Offset for the shadow
            shadowOpacity: 0.8, // Opacity for a clearer shadow
            shadowRadius: 5, // How blurred the shadow is
            elevation: 6, // Android-specific shadow depth
          }}
        >
          <Image
            source={icons.support}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TopBar;
