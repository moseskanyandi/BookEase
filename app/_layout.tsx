

import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}> {/* <- Hides header on root */}
        <Stack.Screen name="(driver)" />
        <Stack.Screen name="(passenger)" />
      </Stack>
    </AuthProvider>
  );
}
