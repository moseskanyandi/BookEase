import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
import { UIColors } from '@/constants/colors';
import { BrandStrings, WelcomeStrings } from '@/constants/strings';
import { styles } from './styles';

const features = [
  { icon: 'calendar-check', label: WelcomeStrings.featureEasyBooking },
  { icon: 'map-marker-distance', label: WelcomeStrings.featureLiveTracking },
  { icon: 'shield-check', label: WelcomeStrings.featureSafeReliable },
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
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            {BrandStrings.appNamePrefix}
            <Text style={{ color: colors.primary }}>{BrandStrings.appNameSuffix}</Text>
          </Text>
          <Text style={styles.tagline}>
            <Text style={{ color: colors.primary }}>{BrandStrings.taglineDashLeft}</Text>
            {BrandStrings.tagline}
            <Text style={{ color: colors.primary }}>{BrandStrings.taglineDashRight}</Text>
          </Text>
          <Text style={styles.subHeading}>{WelcomeStrings.subHeading}</Text>
          <Text style={styles.description}>{WelcomeStrings.description}</Text>
        </View>

        {/* Middle spacer to leave the yellow minibus visible */}
        <View style={styles.spacer} />

        {/* Bottom section with features and button */}
        <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 24 }]}>
          <View style={styles.featuresRow}>
            {features.map((f) => (
              <View key={f.label} style={styles.featureItem}>
                <View style={styles.featureIconCircle}>
                  <MaterialCommunityIcons name={f.icon} size={26} color={UIColors.white} />
                </View>
                <Text style={styles.featureLabel}>{f.label}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.buttonText}>{WelcomeStrings.ctaButton}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
