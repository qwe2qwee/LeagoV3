import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { icons } from "@/constants";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const TabIcon = ({
    source,
    focused,
  }: {
    source: ImageSourcePropType;
    focused: boolean;
  }) => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: "67%",
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: focused ? "#e65333" : "transparent",
      }}
    >
      <Image
        source={source}
        style={{
          width: 28,
          height: 28,
          tintColor: "white",
        }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,

        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          height: 80,
          marginHorizontal: 20,
          marginBottom: 20,
          position: "absolute",
          alignItems: "center", // Center items vertically
          justifyContent: "center", // Center items horizontally
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Bills"
        options={{
          title: "Bills",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.bills} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.people} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
