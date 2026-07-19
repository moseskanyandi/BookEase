
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function DriverHome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Driver</Text>
        <Text style={styles.subtitle}>You are Online</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>No active bookings</Text>
        <Text style={styles.cardText}>Go to Bookings tab to see requests</Text>
      </View>
    </SafeAreaView>
  )
}

const COLORS = { primary: '#0F2D6B', secondary: '#FAB400', gray: '#6B7280' }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    marginTop: 4
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F2F2F2'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary
  },
  cardText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 8
  }
})