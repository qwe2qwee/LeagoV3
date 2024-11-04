import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="profilePage" options={{ headerShown: false }} />
      <Stack.Screen name="Home" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
