import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="DetailsBill" options={{ headerShown: false }} />
      <Stack.Screen
        name="PaymentCompletePage"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PaymentScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
