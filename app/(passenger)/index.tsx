import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { BOOKING_COLORS } from '@/components/booking/constants/booking.constants';
import { t } from '@/components/booking/localization/booking.locales';
import { passengerHomeStyles as styles } from '@/components/booking/styles/booking.styles';

export default function PassengerHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('brandName')}</Text>
      <Text style={styles.subtitle}>{t('whereTo')}</Text>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => router.push('/(passenger)/booking-details')}
      >
        <Ionicons name="car" size={24} color={BOOKING_COLORS.navy} />
        <Text style={styles.bookButtonText}>{t('bookARide')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => router.push('/(passenger)/booking-history')}
      >
        <Ionicons name="time" size={20} color={BOOKING_COLORS.white} />
        <Text style={styles.historyButtonText}>{t('viewRideHistory')}</Text>
      </TouchableOpacity>
    </View>
  );
}
