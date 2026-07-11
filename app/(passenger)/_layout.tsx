import { Stack } from 'expo-router';

export default function PassengerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="request-ride" />
      <Stack.Screen name="booking-history" />
      <Stack.Screen name="booking-details" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
