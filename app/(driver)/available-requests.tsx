import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { acceptBooking, subscribeToPendingBookings, updateBookingStatus } from '../../services/bookingService';
import { Booking } from '../../types';

const COLORS = {
  primary: '#0F2D6B',
  secondary: '#F4B400',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
};

type DisplayBooking = Booking & { passengerName?: string };

const dummyRequests: DisplayBooking[] = [
  {
    id: 'demo-1',
    passengerId: 'jane.doe',
    passengerName: 'Jane Doe',
    pickup: { address: 'Karura Forest Entrance' },
    destination: { address: 'Westlands Mall' },
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'demo-2',
    passengerId: 'samuel.ngugi',
    passengerName: 'Samuel Ngugi',
    pickup: { address: 'Kilimani Roundabout' },
    destination: { address: 'Yaya Centre' },
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 27).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 27).toISOString(),
  },
  {
    id: 'demo-3',
    passengerId: 'edinah.mwangi',
    passengerName: 'Edinah Mwangi',
    pickup: { address: 'Nairobi Railway Station' },
    destination: { address: 'Kilimani Heights' },
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
  },
];

export default function AvailableRequests() {
	const [requests, setRequests] = useState<DisplayBooking[]>(dummyRequests);
	const [loading, setLoading] = useState(true);
	const [accepting, setAccepting] = useState<string | null>(null);
	const [declining, setDeclining] = useState<string | null>(null);
	const { user } = useAuth();

	useEffect(() => {
		const unsubscribe = subscribeToPendingBookings((bookings) => {
			setRequests(bookings.length > 0 ? bookings : dummyRequests);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const handleAccept = async (bookingId: string) => {
		if (!user) {
			Alert.alert('Not signed in', 'Please sign in to accept requests.');
			return;
		}
		setAccepting(bookingId);
		const res = await acceptBooking(bookingId, user.uid);
		setAccepting(null);
		if (res.error) {
			Alert.alert('Error', res.error);
		} else {
			Alert.alert('Accepted', 'You have accepted the booking.');
		}
	};

	const handleDecline = async (bookingId: string) => {
		if (!user) {
			Alert.alert('Not signed in', 'Please sign in to decline requests.');
			return;
		}
		setDeclining(bookingId);
		const res = await updateBookingStatus(bookingId, 'cancelled');
		setDeclining(null);
		if (res.error) {
			Alert.alert('Error', res.error);
		} else {
			Alert.alert('Declined', 'You have declined the booking.');
		}
	};

	const renderItem = ({ item }: { item: DisplayBooking }) => (
		<View style={styles.card}>
			<View style={styles.row}>
				<Text style={styles.label}>Passenger</Text>
				<Text style={styles.value}>{item.passengerName ?? item.passengerId}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>Pickup</Text>
				<Text style={styles.value}>{item.pickup?.address}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>Destination</Text>
				<Text style={styles.value}>{item.destination?.address}</Text>
			</View>
			<View style={styles.rowBottom}>
				<Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
				<View style={styles.buttons}>
					<TouchableOpacity
						style={styles.declineButton}
						onPress={() => handleDecline(item.id)}
						disabled={accepting !== null || declining !== null}
					>
						{declining === item.id ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.declineText}>Decline</Text>
						)}
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.acceptButton}
						onPress={() => handleAccept(item.id)}
						disabled={accepting !== null || declining !== null}
					>
						{accepting === item.id ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.acceptText}>Accept</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{requests.length === 0 ? (
				<View style={styles.center}>
					<Text style={styles.empty}>No available requests</Text>
				</View>
			) : (
				<FlatList data={requests} keyExtractor={(i) => i.id} renderItem={renderItem} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: COLORS.surface,
    padding: 18,
    borderRadius: 24,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  row: { marginBottom: 10 },
  label: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 },
  value: { fontSize: 15, color: COLORS.text, fontWeight: '700' },
  rowBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  buttons: { flexDirection: 'row' },
  declineButton: { backgroundColor: '#FEE2E2', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, marginRight: 10 },
  declineText: { color: '#B91C1C', fontWeight: '700' },
  time: { fontSize: 12, color: COLORS.textSecondary },
  acceptButton: { backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 18, borderRadius: 14 },
  acceptText: { color: COLORS.surface, fontWeight: '700' },
  empty: { color: COLORS.textSecondary, fontSize: 15 },
});
