import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="BookingPage" options={{ headerShown: false }} />
      <Stack.Screen name="CarDetailsPage" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
