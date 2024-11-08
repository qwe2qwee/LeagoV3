import useAuthStore from "@/store/useAuthStore";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { I18nManager } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Montserrat Fonts (English)
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),

    // Zain Fonts (Arabic)
    "Zain-Bold": require("../assets/fonts/Zain-Bold.ttf"),
    "Zain-ExtraBold": require("../assets/fonts/Zain-ExtraBold.ttf"),
    "Zain-ExtraLight": require("../assets/fonts/Zain-ExtraLight.ttf"),
    "Zain-Light": require("../assets/fonts/Zain-Light.ttf"),
    "Zain-Regular": require("../assets/fonts/Zain-Regular.ttf"),
  });

  const router = useRouter();
  const { user, getCurrentUser, loading } = useAuthStore();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const configureApp = async () => {
      // Ensure RTL is disabled
      if (I18nManager.isRTL) {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
      }

      // Check user authentication status
      await getCurrentUser(); // Fetch user info if logged in
    };

    configureApp();
  }, []);

  useEffect(() => {
    if (fontsLoaded && !loading) {
      setAppReady(true);
      SplashScreen.hideAsync(); // Hide splash screen only when app is fully ready
    }
  }, [fontsLoaded, loading]);

  useEffect(() => {
    if (appReady) {
      // Navigate to appropriate screen based on user authentication status
      if (user) {
        router.push("/(root)/(tabs)/Home"); // Redirect authenticated user to home
      } else {
        router.push("/(auth)/welcome"); // Redirect to auth screens for non-authenticated users
      }
    }
  }, [appReady, user, router]);

  if (!appReady) {
    return null; // Render nothing until fonts and user state are fully loaded
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="screens" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
