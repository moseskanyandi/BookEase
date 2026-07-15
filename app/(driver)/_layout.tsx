
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const COLORS = { navy: '#0F2D6B', yellow: '#F4B400', gray: '#6B7280', white: '#fff' }

export default function DriverLayout() {

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
      options={{ 
        title: 'Home', 
        tabBarIcon: ({color,size}) => <Ionicons name="home" size={size} color={color} /> 
      }} />

    <Tabs.Screen 
      name="bookings" 
      options={{ 
        title: 'Bookings', 
        tabBarIcon: ({color,size}) => <Ionicons name="list" size={size} color={color} /> 
      }} />

    <Tabs.Screen 
      name="profile" 
      options={{ 
        title: 'Profile', 
        tabBarIcon: ({color,size}) => <Ionicons name="person" size={size} color={color} /> // <-- ADD THIS ONE
      }} />

    <Tabs.Screen 
      name="earnings" 
      options={{ 
        title: 'Earnings', 
        tabBarIcon: ({color,size}) => <Ionicons name="wallet" size={size} color={color} />
      }} />

    <Tabs.Screen
      name="booking/[id]"
      options={{
        href: null,
        headerShown: false,
      }}
    />

  </Tabs>
)}
