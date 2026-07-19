import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import {
  BOOKING_COLORS,
  DEFAULT_CAR_LABEL,
  DEFAULT_COORDINATES,
  DEFAULT_DRIVER_AVATAR,
  formatBookingTime,
  getEstimatedFareAmount,
  getStatusBadgeColor,
} from '@/components/booking/constants/booking.constants';
import {
  useBooking,
  useBookingActions,
  useDriverDetails,
} from '@/components/booking/hooks/useBooking';
import { t } from '@/components/booking/localization/booking.locales';
import { passengerDetailsStyles as styles } from '@/components/booking/styles/booking.styles';
import { useAuth } from '@/context/AuthContext';

const SafeMap =
  Platform.OS === 'web'
    ? () => (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>{t('mapWebOnly')}</Text>
        </View>
      )
    : MapView;

export default function PassengerBookingDetails() {
  const { id } = useLocalSearchParams();
  const bookingId = typeof id === 'string' ? id : undefined;
  const router = useRouter();
  const { loading } = useAuth();
  const { booking, fetching } = useBooking(bookingId);
  const { driver } = useDriverDetails(booking?.driverId);
  const { submitting: cancelling, cancelBooking } = useBookingActions(bookingId);

  if (loading || fetching) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={BOOKING_COLORS.primary} />
        <Text style={styles.loadingText}>{t('fetchingRideDetails')}</Text>
      </SafeAreaView>
    );
  }

  if (!booking) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>{t('bookingNotFound')}</Text>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/(passenger)' as any)}
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
  const showCancelButton =
    booking.status === 'pending' || booking.status === 'accepted';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.iconBack}
            onPress={() => router.push('/(passenger)' as any)}
          >
            <Text style={styles.backText}>{t('back')}</Text>
          </Pressable>
          <Text style={styles.title}>Ride #{booking.id.substring(0, 8)}</Text>
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
          initialRegion={{
            latitude: (pickupLat + destLat) / 2,
            longitude: (pickupLng + destLng) / 2,
            latitudeDelta: Math.abs(pickupLat - destLat) * 1.5 || 0.08,
            longitudeDelta: Math.abs(pickupLng - destLng) * 1.5 || 0.08,
          }}
        >
          <Marker
            coordinate={{ latitude: pickupLat, longitude: pickupLng }}
            title={t('pickup')}
            pinColor={BOOKING_COLORS.secondary}
          />
          <Marker
            coordinate={{ latitude: destLat, longitude: destLng }}
            title={t('dropoff')}
            pinColor={BOOKING_COLORS.primary}
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

        {booking.driverId ? (
          <View style={styles.driverCard}>
            <Image
              source={{ uri: DEFAULT_DRIVER_AVATAR }}
              style={styles.driverAvatar}
            />
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>
                {driver?.name || t('loadingDriverInfo')}
              </Text>
              <Text style={styles.driverCar}>
                {driver?.car || DEFAULT_CAR_LABEL}
              </Text>
              {driver?.phone ? (
                <Text style={styles.driverPhone}>📞 {driver.phone}</Text>
              ) : null}
            </View>
          </View>
        ) : (
          <View style={styles.searchingCard}>
            {booking.status === 'pending' ? (
              <>
                <ActivityIndicator size="small" color={BOOKING_COLORS.primary} />
                <Text style={styles.searchingText}>{t('findingDriver')}</Text>
              </>
            ) : (
              <Text style={styles.searchingText}>{t('noDriverAssigned')}</Text>
            )}
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardText}>
            📍 {t('pickup')}: {booking.pickup.address}
          </Text>
          <Text style={styles.cardText}>
            🏁 {t('dropoff')}: {booking.destination.address}
          </Text>
          <Text style={[styles.cardText, styles.fareText]}>
            💰 {t('estimatedFare')}: K{getEstimatedFareAmount(booking.id)}
          </Text>
          <Text style={styles.cardText}>
            ⏱️ {t('created')}: {formatBookingTime(booking.createdAt)}
          </Text>
        </View>

        {showCancelButton && (
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, cancelling && styles.buttonDisabled]}
              onPress={() =>
                cancelBooking(() => router.push('/(passenger)' as any))
              }
              disabled={cancelling}
            >
              {cancelling ? (
                <ActivityIndicator size="small" color={BOOKING_COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>{t('cancelRide')}</Text>
              )}
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
