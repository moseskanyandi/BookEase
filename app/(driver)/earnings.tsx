
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const COLORS = { navy: '#0F2D6B', yellow: '#F4B400', white: '#fff', gray: '#6B7280', green: '#10B981' }

// FAKE EARNINGS DATA - later this comes from API
const stats = {
  today: 320,
  week: 1840,
  month: 7200,
  trips: 128
}

const trips = [
  { id: '1', to: 'EastPark Mall', fare: 80, time: 'Today 3:20 PM' },
  { id: '2', to: 'Arcades Mall', fare: 120, time: 'Today 1:15 PM' },
  { id: '3', to: 'Levy Mall', fare: 95, time: 'Yesterday 6:40 PM' },
]

export default function Earnings() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Earnings</Text>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, {backgroundColor: COLORS.navy}]}>
          <Text style={styles.summaryLabel}>Today</Text>
          <Text style={styles.summaryAmount}>K{stats.today}</Text>
        </View>
        <View style={[styles.summaryCard, {backgroundColor: COLORS.yellow}]}>
          <Text style={[styles.summaryLabel, {color: COLORS.navy}]}>This Week</Text>
          <Text style={[styles.summaryAmount, {color: COLORS.navy}]}>K{stats.week}</Text>
        </View>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>This Month</Text>
        <Text style={styles.totalAmount}>K{stats.month}</Text>
        <Text style={styles.totalTrips}>{stats.trips} trips completed</Text>
      </View>

      {/* Recent Trips */}
      <Text style={styles.sectionTitle}>Recent Trips</Text>
      {trips.map(trip => (
        <View key={trip.id} style={styles.tripCard}>
          <View style={{flex: 1}}>
            <Text style={styles.tripLocation}>{trip.to}</Text>
            <Text style={styles.tripTime}>{trip.time}</Text>
          </View>
          <View style={styles.farePill}>
            <Text style={styles.fareText}>+K{trip.fare}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.gray },
  header: { fontSize: 24, fontWeight: 'bold', color: COLORS.white, padding: 20, backgroundColor: COLORS.navy },
  summaryRow: { flexDirection: 'row', gap: 12, padding: 16 },
  summaryCard: { flex: 1, borderRadius: 16, padding: 16 },
  summaryLabel: { color: COLORS.white, fontSize: 14, opacity: 0.8 },
  summaryAmount: { color: COLORS.white, fontSize: 24, fontWeight: 'bold', marginTop: 8 },
  totalCard: { 
    backgroundColor: COLORS.white, 
    marginHorizontal: 16, 
    borderRadius: 16, 
    padding: 20, 
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 3
  },
  totalLabel: { fontSize: 14, color: '#6B7280' },
  totalAmount: { fontSize: 32, fontWeight: 'bold', color: COLORS.navy, marginVertical: 8 },
  totalTrips: { fontSize: 14, color: COLORS.green, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.navy, padding: 16, paddingBottom: 8 },
  tripCard: { 
    backgroundColor: COLORS.white, 
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 16, 
    marginHorizontal: 16, 
    marginBottom: 10, 
    borderRadius: 12 
  },
  tripLocation: { fontSize: 16, fontWeight: '600', color: COLORS.navy },
  tripTime: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  farePill: { backgroundColor: '#D1FAE5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  fareText: { color: COLORS.green, fontWeight: 'bold', fontSize: 16 }
})