import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { I18nManager } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    // Montserrat Fonts (English)
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),

    // ZAIN Fonts (Arabic)
    "Zain-Bold": require("../assets/fonts/Zain-Bold.ttf"),
    "Zain-ExtraBold": require("../assets/fonts/Zain-ExtraBold.ttf"),
    "Zain-ExtraLight": require("../assets/fonts/Zain-ExtraLight.ttf"),
    "Zain-Light": require("../assets/fonts/Zain-Light.ttf"),
    "Zain-Regular": require("../assets/fonts/Zain-Regular.ttf"),
  });

  useEffect(() => {
    const configureRTL = () => {
      if (I18nManager.isRTL) {
        I18nManager.forceRTL(false); // Disable RTL
        I18nManager.allowRTL(false); // Prevent RTL
      }
    };

    configureRTL(); // Ensure RTL is disabled
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
