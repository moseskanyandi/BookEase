import { Image, Text, View } from 'react-native';
import { Colors } from '@/constants/theme';
import { BrandStrings } from '@/constants/strings';
import { useSplash } from '@/hooks/use-splash';
import { styles } from './splash-screen.styles';

export default function SplashScreen() {
  useSplash();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        {BrandStrings.appNamePrefix}
        <Text style={{ color: Colors.secondary }}>{BrandStrings.appNameSuffix}</Text>
      </Text>
      <Text style={styles.tagline}>
        <Text style={{ color: Colors.secondary }}>{BrandStrings.taglineDashLeft}</Text>
        {BrandStrings.tagline}
        <Text style={{ color: Colors.secondary }}>{BrandStrings.taglineDashRight}</Text>
      </Text>
    </View>
  );
}
