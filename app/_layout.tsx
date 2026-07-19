
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.webWrapper}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="welcome" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="(passenger)" options={{ headerShown: false }} />
            <Stack.Screen name="(driver)" options={{ headerShown: false }} />
          </Stack>
        </View>
        <StatusBar style="light" />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  webWrapper: Platform.OS === 'web' 
    ? {
        flex: 1,
        maxWidth: 480,
        marginHorizontal: 'auto',
        width: '100%',
        minHeight: '100vh' as any,
      }
    : { flex: 1 },
});