import { useEffect, useState, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

import {
  BOOKING_COLORS,
  DEFAULT_COORDINATES,
  getStableRouteStats,
} from '@/components/booking/constants/booking.constants';
import type { Booking } from '@/components/booking/types/booking.types';
import { useAuth } from '@/context/AuthContext';
import {
  acceptBooking,
  subscribeToAvailableBookings,
} from '@/services/bookingService';

const LUSAKA = {
  latitude: DEFAULT_COORDINATES.pickup.latitude,
  longitude: DEFAULT_COORDINATES.pickup.longitude,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

const SafeMap =
  Platform.OS === 'web'
    ? ({ children, style }: { children?: ReactNode; style?: object }) => (
        <View style={[style, styles.mapPlaceholder]}>
          <Text style={styles.mapPlaceholderText}>Map works on phone only</Text>
          {children}
        </View>
      )
    : MapView;

export default function BookingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [requests, setRequests] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().catch(() => undefined);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToAvailableBookings((data) => {
      setRequests(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleAccept = async (id: string) => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to accept a ride.');
      return;
    }

    try {
      setAcceptingId(id);
      await acceptBooking(id, user.uid);
      Alert.alert('Accepted!', 'Ride accepted. Opening booking details.');
      router.push(`/(driver)/booking/${id}`);
    } catch {
      Alert.alert('Error', 'Could not accept booking.');
    } finally {
      setAcceptingId(null);
    }
  };

  const renderCard = ({ item }: { item: Booking }) => {
    const stats = getStableRouteStats(item.id);
    const isAccepting = acceptingId === item.id;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.fare}>{stats.fare}</Text>
          <View style={styles.etaBadge}>
            <Text style={styles.etaText}>{stats.time}</Text>
          </View>
        </View>

        <View style={styles.route}>
          <View style={styles.dotYellow} />
          <Text style={styles.routeText} numberOfLines={1}>
            <Text style={styles.bold}>Pickup: </Text>
            {item.pickup?.address ?? 'Unknown'}
          </Text>
        </View>

        <View style={styles.route}>
          <View style={styles.dotNavy} />
          <Text style={styles.routeTextGray} numberOfLines={1}>
            <Text style={styles.bold}>Dropoff: </Text>
            {item.destination?.address ?? 'Unknown'}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{stats.distance}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleAccept(item.id)}
            disabled={!!acceptingId}
          >
            {isAccepting ? (
              <ActivityIndicator size="small" color={BOOKING_COLORS.yellow} />
            ) : (
              <Text style={styles.acceptBtn}>Tap to Accept →</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapSection}>
        <SafeMap
          style={styles.map}
          initialRegion={LUSAKA}
          showsUserLocation
        >
          {requests.flatMap((booking) => {
            const pickupLat =
              booking.pickup?.latitude ?? DEFAULT_COORDINATES.pickup.latitude;
            const pickupLng =
              booking.pickup?.longitude ?? DEFAULT_COORDINATES.pickup.longitude;
            const destLat =
              booking.destination?.latitude ??
              DEFAULT_COORDINATES.destination.latitude;
            const destLng =
              booking.destination?.longitude ??
              DEFAULT_COORDINATES.destination.longitude;

            return [
              <Marker
                key={`${booking.id}-pickup`}
                coordinate={{ latitude: pickupLat, longitude: pickupLng }}
                title="Pickup"
                description={booking.pickup?.address}
                pinColor={BOOKING_COLORS.yellow}
              />,
              <Marker
                key={`${booking.id}-dropoff`}
                coordinate={{ latitude: destLat, longitude: destLng }}
                title="Dropoff"
                description={booking.destination?.address}
                pinColor={BOOKING_COLORS.navy}
              />,
            ];
          })}
        </SafeMap>
      </View>

      <View style={styles.listSection}>
        <Text style={styles.title}>Available Requests</Text>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={BOOKING_COLORS.primary} />
            <Text style={styles.loadingText}>Loading requests...</Text>
          </View>
        ) : requests.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No requests available right now.</Text>
          </View>
        ) : (
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id}
            renderItem={renderCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BOOKING_COLORS.bg },
  mapSection: { flex: 0.4 },
  listSection: { flex: 0.6 },
  map: { width: '100%', height: '100%' },
  mapPlaceholder: {
    backgroundColor: BOOKING_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: { color: BOOKING_COLORS.gray },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: BOOKING_COLORS.primary,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { marginTop: 10, color: BOOKING_COLORS.gray },
  emptyText: { color: BOOKING_COLORS.gray, fontSize: 16, textAlign: 'center' },
  card: {
    backgroundColor: BOOKING_COLORS.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: BOOKING_COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fare: { fontSize: 28, fontWeight: '800', color: BOOKING_COLORS.primary },
  etaBadge: {
    backgroundColor: BOOKING_COLORS.yellow,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  etaText: { fontWeight: '700', color: BOOKING_COLORS.primary },
  route: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  dotYellow: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BOOKING_COLORS.yellow,
    marginRight: 10,
  },
  dotNavy: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BOOKING_COLORS.primary,
    marginRight: 10,
  },
  routeText: { flex: 1, fontSize: 16, color: BOOKING_COLORS.primary },
  routeTextGray: { flex: 1, fontSize: 16, color: BOOKING_COLORS.gray },
  bold: { fontWeight: '700' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: BOOKING_COLORS.border,
  },
  distanceBadge: {
    backgroundColor: '#4B5563',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  distanceText: { color: BOOKING_COLORS.white, fontWeight: '600' },
  acceptBtn: {
    color: BOOKING_COLORS.yellow,
    fontWeight: '800',
    fontSize: 16,
  },
});
