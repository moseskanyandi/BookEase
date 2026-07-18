import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';


import {
  BOOKING_COLORS,
  DEFAULT_COORDINATES,
  getStableFare,
  getStatusBadgeColor,
} from '@/components/booking/constants/booking.constants';
import {
  useBooking,
  useBookingActions,
} from '@/components/booking/hooks/useBooking';
import { t } from '@/components/booking/localization/booking.locales';
import { driverDetailsStyles as styles } from '@/components/booking/styles/booking.styles';
import { useAuth } from '@/context/AuthContext';

const SafeMap =
  Platform.OS === 'web'
    ? ({ children, style }: { children?: ReactNode; style?: object }) => (
        <View style={[style, styles.mapPlaceholder]}>
          <Text style={styles.mapPlaceholderText}>{t('mapWebOnly')}</Text>
          {children}
        </View>
      )
    : MapView;

export default function BookingDetails() {
  const { id } = useLocalSearchParams();
  const bookingId = typeof id === 'string' ? id : undefined;
  const router = useRouter();
  const { user, loading } = useAuth();
  const { booking, fetching } = useBooking(bookingId);
  const { submitting, acceptRide, updateStatus } = useBookingActions(bookingId);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().catch(() => undefined);
  }, []);

  if (loading || fetching) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={BOOKING_COLORS.primary} />
        <Text style={styles.loadingText}>{t('fetchingBookingDetails')}</Text>
      </SafeAreaView>
    );
  }

  if (!booking) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>{t('bookingNotFoundOrDeleted')}</Text>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/(driver)/bookings')}
        >
          <Text style={styles.backButtonText}>{t('goBack')}</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const pickupLat =
    booking.pickup.latitude ?? DEFAULT_COORDINATES.pickup.latitude;
  const pickupLng =
    booking.pickup.longitude ?? DEFAULT_COORDINATES.pickup.longitude;
  const destLat =
    booking.destination.latitude ?? DEFAULT_COORDINATES.destination.latitude;
  const destLng =
    booking.destination.longitude ?? DEFAULT_COORDINATES.destination.longitude;
  const fare = getStableFare(booking.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.iconBack}
            onPress={() => router.push('/(driver)/bookings')}
          >
            <Text style={styles.backText}>{t('back')}</Text>
          </Pressable>
          <Text style={styles.title}>
            Booking #{booking.id.substring(0, 8)}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusBadgeColor(booking.status) },
            ]}
          >
            <Text style={styles.statusBadgeText}>
              {booking.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <SafeMap
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: (pickupLat + destLat) / 2,
            longitude: (pickupLng + destLng) / 2,
            latitudeDelta: Math.abs(pickupLat - destLat) * 1.5 || 0.05,
            longitudeDelta: Math.abs(pickupLng - destLng) * 1.5 || 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: pickupLat, longitude: pickupLng }}
            title={t('pickup')}
            description={booking.pickup.address}
            pinColor={BOOKING_COLORS.yellow}
          />
          <Marker
            coordinate={{ latitude: destLat, longitude: destLng }}
            title={t('dropoff')}
            description={booking.destination.address}
            pinColor={BOOKING_COLORS.navy}
          />
          <Polyline
            coordinates={[
              { latitude: pickupLat, longitude: pickupLng },
              { latitude: destLat, longitude: destLng },
            ]}
            strokeColor={BOOKING_COLORS.primary}
            strokeWidth={3}
          />
        </SafeMap>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            📍 <Text style={styles.labelText}>{t('pickupLabel')}</Text>{' '}
            {booking.pickup.address}
          </Text>
          <Text style={styles.cardText}>
            🏁 <Text style={styles.labelText}>{t('dropoffLabel')}</Text>{' '}
            {booking.destination.address}
          </Text>
          <Text style={[styles.cardText, styles.fareText]}>
            💰 {t('fare')}: {fare}
          </Text>
        </View>

        <View style={styles.actionsCard}>
          {booking.status === 'pending' && (
            <View style={styles.buttonRow}>
              <Pressable
                style={[
                  styles.button,
                  styles.declineButton,
                  submitting && styles.buttonDisabled,
                ]}
                onPress={() => router.push('/(driver)/bookings')}
                disabled={submitting}
              >
                <Text style={styles.buttonText}>{t('decline')}</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.acceptButton,
                  submitting && styles.buttonDisabled,
                ]}
                onPress={() => acceptRide(user?.uid)}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color={BOOKING_COLORS.white} />
                ) : (
                  <Text style={styles.buttonText}>{t('accept')}</Text>
                )}
              </Pressable>
            </View>
          )}

          {booking.status === 'accepted' && booking.driverId === user?.uid && (
            <Pressable
              style={[
                styles.fullWidthButton,
                styles.startButton,
                submitting && styles.buttonDisabled,
              ]}
              onPress={() => updateStatus('in_progress')}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator size="small" color={BOOKING_COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>{t('startRide')}</Text>
              )}
            </Pressable>
          )}

          {booking.status === 'in_progress' &&
            booking.driverId === user?.uid && (
              <Pressable
                style={[
                  styles.fullWidthButton,
                  styles.completeButton,
                  submitting && styles.buttonDisabled,
                ]}
                onPress={() => updateStatus('completed')}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator
                    size="small"
                    color={BOOKING_COLORS.white}
                  />
                ) : (
                  <Text style={styles.buttonText}>{t('completeRide')}</Text>
                )}
              </Pressable>
            )}

          {booking.status === 'completed' && (
            <View style={styles.infoBox}>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={BOOKING_COLORS.success}
              />
              <Text style={styles.infoBoxText}>{t('rideIsCompleted')}</Text>
            </View>
          )}

          {booking.status === 'cancelled' && (
            <View style={styles.infoBox}>
              <Ionicons
                name="close-circle"
                size={24}
                color={BOOKING_COLORS.danger}
              />
              <Text style={styles.infoBoxText}>{t('rideWasCancelled')}</Text>
            </View>
          )}

          {booking.status !== 'pending' && booking.driverId !== user?.uid && (
            <View style={styles.infoBox}>
              <Ionicons
                name="lock-closed"
                size={24}
                color={BOOKING_COLORS.gray}
              />
              <Text style={styles.infoBoxText}>{t('assignedToAnother')}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
