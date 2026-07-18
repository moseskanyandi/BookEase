import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import {
  acceptBooking,
  subscribeToPendingBookings,
  updateBookingStatus,
} from '../services/bookingService';
import { Booking } from '../types';

interface DriverRequestItem extends Booking {
  passengerName?: string;
}

export default function DriverRequestsScreen() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<DriverRequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToPendingBookings((bookings) => {
      setRequests(bookings as DriverRequestItem[]);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleAccept = async (bookingId: string) => {
    if (!user?.uid) {
      Alert.alert('Driver Required', 'Please sign in as a driver first.');
      return;
    }

    const result = await acceptBooking(bookingId, user.uid);
    if (result.error) {
      Alert.alert('Unable to accept', result.error);
    }
  };

  const handleDecline = async (bookingId: string) => {
    const result = await updateBookingStatus(bookingId, 'cancelled');
    if (result.error) {
      Alert.alert('Unable to decline', result.error);
    }
  };

  const renderRequest = ({ item }: { item: DriverRequestItem }) => {
    const passengerName = item.passengerName ?? item.passengerId ?? 'Passenger';
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.passengerName}>{passengerName}</Text>
          <Text style={styles.routeText}>Pickup: {item.pickup?.address ?? 'Unknown'}</Text>
          <Text style={styles.routeText}>Destination: {item.destination?.address ?? 'Unknown'}</Text>
        </View>
        <View style={styles.actionGroup}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleAccept(item.id)}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.declineButton]}
            onPress={() => handleDecline(item.id)}
          >
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ride Requests</Text>
        <Text style={styles.subtitle}>Pending requests waiting for your confirmation.</Text>
      </View>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {loading ? 'Loading ride requests…' : 'No pending ride requests.'}
            </Text>
          </View>
        }
        renderItem={renderRequest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#0F2D6B',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: '#DCE7FF',
    fontSize: 14,
    marginTop: 6,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    marginBottom: 16,
  },
  passengerName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F2D6B',
    marginBottom: 8,
  },
  routeText: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
  },
  actionGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  acceptButton: {
    backgroundColor: '#F4B400',
  },
  declineButton: {
    backgroundColor: '#E2E8F0',
  },
  buttonText: {
    color: '#0F2D6B',
    fontWeight: '700',
  },
  declineText: {
    color: '#6B7280',
    fontWeight: '700',
  },
  emptyState: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#64748B',
    fontSize: 15,
  },
});
