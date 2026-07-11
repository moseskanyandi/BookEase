import { Stack } from 'expo-router';

export default function DriverLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="available-requests" />
      <Stack.Screen name="booking-details" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
