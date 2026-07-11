import { Colors } from '@/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const features = [
  { icon: 'calendar-check', label: 'Easy Booking' },
  { icon: 'map-marker-distance', label: 'Live Tracking' },
  { icon: 'shield-check', label: 'Safe & Reliable' },
] as const;

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/welcome-bg.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Header section with top safe area padding */}
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>
            Book<Text style={{ color: Colors.secondary }}>Ease</Text>
          </Text>
          <Text style={styles.tagline}>
            <Text style={{ color: Colors.secondary }}>— </Text>
            Ride Easy. Book Smart.
            <Text style={{ color: Colors.secondary }}> —</Text>
          </Text>
          <Text style={styles.subHeading}>Book Your Journey with Confidence</Text>
          <Text style={styles.description}>
            Search routes, reserve seats, and travel across Zambia with a fast, secure, and reliable booking experience.
          </Text>
        </View>

        {/* Middle spacer to leave the yellow minibus visible */}
        <View style={styles.spacer} />

        {/* Bottom section with features and button */}
        <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 24 }]}>
          <View style={styles.featuresRow}>
            {features.map((f) => (
              <View key={f.label} style={styles.featureItem}>
                <View style={styles.featureIconCircle}>
                  <MaterialCommunityIcons name={f.icon} size={26} color="#fff" />
                </View>
                <Text style={styles.featureLabel}>{f.label}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F2D6B',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    gap: 28,
    paddingHorizontal: 24,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  featureItem: {
    alignItems: 'center',
    gap: 10,
  },
  featureIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(11, 32, 76, 0.85)',
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureLabel: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F2D6B',
  },
});