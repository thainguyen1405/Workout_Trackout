import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false, // Hides the header for this screen
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reset-link"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verify-email"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}