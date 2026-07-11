import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/context/AuthContext';
import '@/localization/i18n';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.webWrapper}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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