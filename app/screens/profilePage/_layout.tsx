import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="PersonalInfo" options={{ headerShown: false }} />
      <Stack.Screen name="Documents" options={{ headerShown: false }} />
      <Stack.Screen name="Address" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
