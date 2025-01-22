import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
// Import your global CSS file
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ActivityIndicator, I18nManager, Text, View } from "react-native";
import useAuthStore from "@/store/useAuthStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);
  const { user, getCurrentUser, loading } = useAuthStore();

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Zain-Bold": require("../assets/fonts/Zain-Bold.ttf"),
    "Zain-ExtraBold": require("../assets/fonts/Zain-ExtraBold.ttf"),
    "Zain-ExtraLight": require("../assets/fonts/Zain-ExtraLight.ttf"),
    "Zain-Light": require("../assets/fonts/Zain-Light.ttf"),
    "Zain-Regular": require("../assets/fonts/Zain-Regular.ttf"),
  });

  useEffect(() => {
    const configureApp = async () => {
      try {
        // Ensure the app uses LTR layout.
        if (I18nManager.isRTL) {
          I18nManager.forceRTL(false);
          I18nManager.allowRTL(false);
        }
        // Load current user details.
        await getCurrentUser();
      } catch (error) {
        console.error("Error during app configuration:", error);
      }
    };

    configureApp();
  }, []);

  useEffect(() => {
    const prepareApp = async () => {
      if (fontsLoaded) {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  useEffect(() => {
    if (appReady) {
      try {
        if (user) {
          router.push("/(tabs)");
        } else {
          router.push("/(auth)/welcome");
        }
      } catch (error) {
        console.error("Error during navigation:", error);
      }
    }
  }, [appReady, user]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text className="text-2xl text-black">Loading fonts...</Text>
      </View>
    );
  }

  // Render nothing until fonts and app are ready.
  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text className="text-2xl text-black"> not ready</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="screens" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="inverted" />
    </ThemeProvider>
  );
}
