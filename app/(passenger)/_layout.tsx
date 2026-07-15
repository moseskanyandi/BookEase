
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const COLORS = { navy: '#0F2D6B', yellow: '#F4B400', gray: '#6B7280', white: '#fff' }

export default function PassengerLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: COLORS.navy },
      headerTintColor: COLORS.white,
      headerTitle: 'BookEase',
      tabBarActiveTintColor: COLORS.yellow,
      tabBarInactiveTintColor: COLORS.gray,
      tabBarStyle: { backgroundColor: COLORS.navy, height: 65, paddingBottom: 8 },
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Home', tabBarIcon: ({color,size}) => <Ionicons name="home" size={size} color={color} /> }} />
      <Tabs.Screen 
        name="booking-history" 
        options={{ title: 'History', tabBarIcon: ({color,size}) => <Ionicons name="time" size={size} color={color} /> }} />
      <Tabs.Screen 
        name="booking-details" 
        options={{ href: null, title: 'Ride Details' }} />
    </Tabs>
  )
}