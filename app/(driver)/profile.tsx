import { Ionicons } from '@expo/vector-icons';
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import app from '@/api/firebase';
import { BOOKING_COLORS } from '@/components/booking/constants/booking.constants';
import { useAuth } from '@/context/auth-context';
import { logOut } from '@/services/authService';

type DriverFields = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  plate: string;
  rating: number;
  trips: number;
};

const EMPTY: DriverFields = {
  name: '',
  email: '',
  phone: '',
  vehicle: '',
  plate: '',
  rating: 0,
  trips: 0,
};

export default function DriverProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<DriverFields>(EMPTY);
  const [draft, setDraft] = useState<DriverFields>(EMPTY);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const editingRef = useRef(false);
  editingRef.current = editing;

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const db = getFirestore(app);
    const driverRef = doc(db, 'drivers', user.uid);

    const unsubscribe = onSnapshot(
      driverRef,
      (snap) => {
        const data = snap.exists() ? snap.data() : {};
        const next: DriverFields = {
          name: data.name ?? user.displayName ?? '',
          email: data.email ?? user.email ?? '',
          phone: data.phone ?? '',
          vehicle: data.vehicle ?? data.car ?? '',
          plate: data.plate ?? '',
          rating: data.rating ?? 0,
          trips: data.trips ?? 0,
        };
        setProfile(next);
        if (!editingRef.current) setDraft(next);
        setLoading(false);
      },
      (error) => {
        console.error('Driver profile listen error:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user?.uid, user?.email, user?.displayName]);

  const handleEditOrSave = async () => {
    if (!editing) {
      setDraft(profile);
      setEditing(true);
      return;
    }

    if (!user?.uid) {
      Alert.alert('Error', 'You must be logged in to save.');
      return;
    }

    try {
      setSaving(true);
      const db = getFirestore(app);
      await setDoc(
        doc(db, 'drivers', user.uid),
        {
          name: draft.name.trim(),
          email: draft.email.trim(),
          phone: draft.phone.trim(),
          vehicle: draft.vehicle.trim(),
          plate: draft.plate.trim(),
        },
        { merge: true }
      );
      setProfile(draft);
      setEditing(false);
      Alert.alert('Saved', 'Profile updated successfully.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const { error } = await logOut();
      if (error) {
        Alert.alert('Error', error);
        return;
      }
      Alert.alert('Logged out', 'You have been signed out.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Logout failed.');
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={BOOKING_COLORS.primary} />
      </View>
    );
  }

  const display = editing ? draft : profile;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={60} color={BOOKING_COLORS.white} />
        </View>
        {editing ? (
          <TextInput
            style={[styles.name, styles.nameInput]}
            value={draft.name}
            onChangeText={(name) => setDraft((prev) => ({ ...prev, name }))}
            placeholder="Driver name"
            placeholderTextColor={BOOKING_COLORS.gray}
          />
        ) : (
          <Text style={styles.name}>{profile.name || 'Driver'}</Text>
        )}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color={BOOKING_COLORS.yellow} />
          <Text style={styles.rating}>
            {profile.rating || '—'} • {profile.trips || 0} trips
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <InfoRow
          icon="mail"
          label="Email"
          value={display.email}
          editing={editing}
          onChangeText={(email) => setDraft((prev) => ({ ...prev, email }))}
          keyboardType="email-address"
        />
        <InfoRow
          icon="call"
          label="Phone"
          value={display.phone}
          editing={editing}
          onChangeText={(phone) => setDraft((prev) => ({ ...prev, phone }))}
          keyboardType="phone-pad"
        />
        <InfoRow
          icon="car"
          label="Vehicle"
          value={display.vehicle}
          editing={editing}
          onChangeText={(vehicle) => setDraft((prev) => ({ ...prev, vehicle }))}
        />
        <InfoRow
          icon="id-card"
          label="Plate"
          value={display.plate}
          editing={editing}
          onChangeText={(plate) => setDraft((prev) => ({ ...prev, plate }))}
          last
        />
      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={handleEditOrSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator size="small" color={BOOKING_COLORS.primary} />
        ) : (
          <Text style={styles.editBtnText}>
            {editing ? 'Save' : 'Edit Profile'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
        disabled={loggingOut}
      >
        {loggingOut ? (
          <ActivityIndicator size="small" color={BOOKING_COLORS.white} />
        ) : (
          <Text style={styles.logoutText}>Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
  editing,
  onChangeText,
  keyboardType,
  last,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  editing: boolean;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  last?: boolean;
}) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <Ionicons name={icon} size={20} color={BOOKING_COLORS.primary} />
      <View style={styles.rowContent}>
        <Text style={styles.label}>{label}</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={label}
            placeholderTextColor={BOOKING_COLORS.gray}
            keyboardType={keyboardType}
            autoCapitalize={
              keyboardType === 'email-address' ? 'none' : 'sentences'
            }
          />
        ) : (
          <Text style={styles.value}>{value || '—'}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BOOKING_COLORS.bg, padding: 20 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BOOKING_COLORS.bg,
  },
  avatarContainer: { alignItems: 'center', marginBottom: 24 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: BOOKING_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BOOKING_COLORS.primary,
    textAlign: 'center',
  },
  nameInput: {
    borderBottomWidth: 1,
    borderColor: BOOKING_COLORS.border,
    minWidth: 180,
    paddingVertical: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  rating: { fontSize: 14, color: BOOKING_COLORS.gray },
  card: {
    backgroundColor: BOOKING_COLORS.white,
    borderRadius: 16,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: BOOKING_COLORS.border,
  },
  rowLast: { borderBottomWidth: 0 },
  rowContent: { marginLeft: 12, flex: 1 },
  label: { fontSize: 12, color: BOOKING_COLORS.gray },
  value: { fontSize: 16, fontWeight: '600', color: BOOKING_COLORS.primary },
  input: {
    fontSize: 16,
    fontWeight: '600',
    color: BOOKING_COLORS.primary,
    paddingVertical: 2,
  },
  editBtn: {
    backgroundColor: BOOKING_COLORS.yellow,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  editBtnText: {
    color: BOOKING_COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutBtn: {
    backgroundColor: BOOKING_COLORS.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutText: { color: BOOKING_COLORS.white, fontWeight: 'bold', fontSize: 16 },
});
