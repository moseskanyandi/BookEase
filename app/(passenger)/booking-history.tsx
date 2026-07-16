import { Link } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';

import { BOOKING_COLORS } from '@/components/booking/constants/booking.constants';
import {
    bookingHelpers,
    filterPassengerBookings,
    usePassengerBookings,
} from '@/components/booking/hooks/useBooking';
import { t } from '@/components/booking/localization/booking.locales';
import { historyStyles as styles } from '@/components/booking/styles/booking.styles';
import type { HistoryTab } from '@/components/booking/types/booking.types';
import { useAuth } from '@/context/auth-context';

export default function PassengerHistory() {
  const [tab, setTab] = useState<HistoryTab>('upcoming');
  const { user, loading } = useAuth();
  const { bookings, fetching } = usePassengerBookings(user?.uid);
  const filteredBookings = filterPassengerBookings(bookings, tab);

  if (loading || fetching) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={BOOKING_COLORS.primary} />
        <Text style={styles.loadingText}>{t('loadingRides')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('myRides')}</Text>
      </View>

      <View style={styles.tabRow}>
        <Pressable
          style={[styles.tab, tab === 'upcoming' && styles.tabActive]}
          onPress={() => setTab('upcoming')}
        >
          <Text style={[styles.tabText, tab === 'upcoming' && styles.tabTextActive]}>
            {t('upcoming')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, tab === 'past' && styles.tabActive]}
          onPress={() => setTab('past')}
        >
          <Text style={[styles.tabText, tab === 'past' && styles.tabTextActive]}>
            {t('past')}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.list}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('noRidesInCategory')}</Text>
          </View>
        ) : (
          filteredBookings.map((item) => {
            const { day, time } = bookingHelpers.formatBookingDate(item.createdAt);
            const routeText = `${item.pickup.address} → ${item.destination.address}`;
            const driverText = item.driverId
              ? t('assigned')
              : t('searchingForDriver');

            return (
              <Link
                key={item.id}
                href={{
                  pathname: '/(passenger)/booking-details',
                  params: { id: item.id },
                }}
                asChild
              >
                <Pressable style={styles.card}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.date}>{day}</Text>
                    <Text style={styles.time}>{time}</Text>
                  </View>
                  <View style={styles.cardMiddle}>
                    <Text
                      style={styles.route}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      📍 {routeText}
                    </Text>
                    <Text style={styles.driver}>{driverText}</Text>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: bookingHelpers.getStatusColor(item.status) },
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {item.status.toUpperCase()}
                    </Text>
                  </View>
                </Pressable>
              </Link>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
