import React, { useState } from 'react';
import {
    Alert,
    Image,
    Linking,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const COLORS = {
  primary: '#0F2D6B',
  secondary: '#F4B400',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
};

const driver = {
  name: 'Marcus J.',
  role: 'Driver',
  rating: 4.92,
  trips: 1248,
  earnings: '$42,910',
  years: '3.5 yrs',
  badge: 'Top Rated',
  avatar:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  verified: true,
};

const documents = [
  { id: 'license', label: 'Driver License', status: 'Verified' },
  { id: 'insurance', label: 'Insurance Policy', status: 'Verified' },
  { id: 'background', label: 'Background Check', status: 'Verified' },
];

const vehicle = {
  name: 'White Mercedes Sprinter',
  plate: 'KCX 482L',
  capacity: '14 Seats',
  year: '2022',
  fuel: 'Diesel',
  image:
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
};

const activity = [
  {
    id: 'trip-1',
    time: 'Today, 09:42 AM',
    title: 'Trip #BRK-9902 Completed',
    detail: 'Downtown Loop • 12 Riders • $145.00 Earned',
    highlight: true,
  },
  {
    id: 'trip-2',
    time: 'Yesterday, 05:15 PM',
    title: 'Vehicle Maintenance Check',
    detail: 'Oil level, tire pressure, and interior sanitation certified.',
  },
];

export default function DriverProfile() {
  const [editMode, setEditMode] = useState(false);
  const [profileState, setProfileState] = useState({ ...driver });
  const [vehicleState, setVehicleState] = useState({ ...vehicle });

  const handleAction = (name: string) => {
    Alert.alert(name, `${name} action pressed`);
  };

  const [shareVisible, setShareVisible] = useState(false);

  const profileUrl = `https://bookease.example/driver/${encodeURIComponent(
    profileState.name.replace(/\s+/g, '-').toLowerCase()
  )}`;

  const shareMessage = `${profileState.name} — ${profileState.role}\nVerified driver on BookEasy. Rating: ${driver.rating}\n${profileUrl}`;

  const openSystemShare = async () => {
    try {
      await Share.share({ message: shareMessage, url: profileUrl });
      setShareVisible(false);
    } catch (e: any) {
      Alert.alert('Share error', e.message || String(e));
    }
  };

  const shareViaSMS = async () => {
    const body = encodeURIComponent(shareMessage);
    const url = Platform.OS === 'ios' ? `sms:&body=${body}` : `sms:?body=${body}`;
    try {
      await Linking.openURL(url);
      setShareVisible(false);
    } catch (e: any) {
      Alert.alert('Cannot open SMS', e.message || String(e));
    }
  };

  const shareViaWhatsApp = async () => {
    const url = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
    try {
      await Linking.openURL(url);
      setShareVisible(false);
    } catch (e: any) {
      Alert.alert('WhatsApp not available', 'Please install WhatsApp to share.');
    }
  };

  const shareViaTwitter = async () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    try {
      await Linking.openURL(url);
      setShareVisible(false);
    } catch (e: any) {
      Alert.alert('Cannot open Twitter', e.message || String(e));
    }
  };

  const shareViaFacebook = async () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}&quote=${encodeURIComponent(
      shareMessage
    )}`;
    try {
      await Linking.openURL(url);
      setShareVisible(false);
    } catch (e: any) {
      Alert.alert('Cannot open Facebook', e.message || String(e));
    }
  };

  const startEdit = () => setEditMode(true);
  const cancelEdit = () => {
    setProfileState({ ...driver });
    setVehicleState({ ...vehicle });
    setEditMode(false);
  };

  const saveProfile = () => {
    if (!profileState.name || profileState.name.trim().length === 0) {
      Alert.alert('Validation', 'Name cannot be empty');
      return;
    }
    // TODO: persist changes to backend (Firestore / API)
    setEditMode(false);
    Alert.alert('Saved', 'Profile changes saved locally.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.profileRow}>
          <View>
            <Image source={{ uri: driver.avatar }} style={styles.avatar} />
            {driver.verified && (
              <View style={styles.verifyBadge}>
                <Text style={styles.verifyBadgeText}>✓</Text>
              </View>
            )}
          </View>
          <View style={styles.headerText}>
            {!editMode ? (
              <>
                <Text style={styles.name}>{profileState.name}</Text>
                <Text style={styles.role}>{profileState.role}</Text>
              </>
            ) : (
              <>
                <TextInput
                  value={profileState.name}
                  onChangeText={(t) => setProfileState((p) => ({ ...p, name: t }))}
                  style={styles.input}
                />
                <Text style={styles.role}>{profileState.role}</Text>
              </>
            )}
            <View style={styles.chipRow}>
              <View style={styles.chip}> 
                <Text style={styles.chipText}>{driver.badge}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.headerButtons}>
          {!editMode ? (
            <>
              <Pressable style={styles.headerButton} onPress={startEdit}>
                <Text style={styles.headerButtonText}>Edit Profile</Text>
              </Pressable>
              <Pressable style={styles.headerButton} onPress={() => setShareVisible(true)}>
                <Text style={styles.headerButtonText}>Share Profile</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable style={[styles.headerButton, styles.saveButton]} onPress={saveProfile}>
                <Text style={[styles.headerButtonText, styles.saveButtonText]}>Save</Text>
              </Pressable>
              <Pressable style={[styles.headerButton, styles.cancelButton]} onPress={cancelEdit}>
                <Text style={[styles.headerButtonText, styles.cancelButtonText]}>Cancel</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>Total Trips</Text>
          <Text style={styles.statsValue}>{driver.trips}</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>Earnings</Text>
          <Text style={styles.statsValue}>{driver.earnings}</Text>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>Years</Text>
          <Text style={styles.statsValue}>{driver.years}</Text>
        </View>
      </View>

      <View style={styles.boxCard}>
        <Text style={styles.boxTitle}>Documentation</Text>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.docRow}>
            <View style={styles.docLabelRow}>
              <Text style={styles.docIcon}>✔</Text>
              <Text style={styles.docLabel}>{doc.label}</Text>
            </View>
            <Text style={styles.docStatus}>{doc.status}</Text>
          </View>
        ))}
      </View>

      <View style={styles.vehicleCard}>
        <View style={styles.vehicleDetails}>
          <Text style={styles.vehicleBadge}>Current Vehicle</Text>
          {!editMode ? (
            <Text style={styles.vehicleTitle}>{vehicleState.name}</Text>
          ) : (
            <TextInput
              value={vehicleState.name}
              onChangeText={(t) => setVehicleState((v) => ({ ...v, name: t }))}
              style={styles.input}
            />
          )}
          <View style={styles.vehicleSpecsRow}>
            <View style={styles.vehicleSpec}>
              <Text style={styles.vehicleSpecLabel}>Plate</Text>
              {!editMode ? (
                <Text style={styles.vehicleSpecValue}>{vehicleState.plate}</Text>
              ) : (
                <TextInput
                  value={vehicleState.plate}
                  onChangeText={(t) => setVehicleState((v) => ({ ...v, plate: t }))}
                  style={styles.inputSmall}
                />
              )}
            </View>
            <View style={styles.vehicleSpec}>
              <Text style={styles.vehicleSpecLabel}>Capacity</Text>
              {!editMode ? (
                <Text style={styles.vehicleSpecValue}>{vehicleState.capacity}</Text>
              ) : (
                <TextInput
                  value={vehicleState.capacity}
                  onChangeText={(t) => setVehicleState((v) => ({ ...v, capacity: t }))}
                  style={styles.inputSmall}
                />
              )}
            </View>
          </View>
          <View style={styles.vehicleSpecsRow}>
            <View style={styles.vehicleSpec}>
              <Text style={styles.vehicleSpecLabel}>Year</Text>
              {!editMode ? (
                <Text style={styles.vehicleSpecValue}>{vehicleState.year}</Text>
              ) : (
                <TextInput
                  value={vehicleState.year}
                  onChangeText={(t) => setVehicleState((v) => ({ ...v, year: t }))}
                  style={styles.inputSmall}
                />
              )}
            </View>
            <View style={styles.vehicleSpec}>
              <Text style={styles.vehicleSpecLabel}>Fuel</Text>
              {!editMode ? (
                <Text style={styles.vehicleSpecValue}>{vehicleState.fuel}</Text>
              ) : (
                <TextInput
                  value={vehicleState.fuel}
                  onChangeText={(t) => setVehicleState((v) => ({ ...v, fuel: t }))}
                  style={styles.inputSmall}
                />
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.activityCard}>
        <Text style={styles.boxTitle}>Recent Fleet Activity</Text>
        {activity.map((item) => (
          <View key={item.id} style={styles.activityRow}>
            <View style={styles.activityBullet} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTime}>{item.time}</Text>
              <Text style={styles.activityTitle}>{item.title}</Text>
              <Text style={styles.activityDetail}>{item.detail}</Text>
            </View>
          </View>
        ))}
        <Pressable style={styles.activityButton} onPress={() => handleAction('View All Activity')}>
          <Text style={styles.activityButtonText}>View All Activity</Text>
        </Pressable>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={[styles.actionButton, styles.secondaryAction]} onPress={() => handleAction('Help')}>
          <Text style={[styles.actionText, styles.secondaryActionText]}>Help</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.secondaryAction]} onPress={() => handleAction('Go Online')}>
          <Text style={[styles.actionText, styles.secondaryActionText]}>Go Online</Text>
        </Pressable>
      </View>
      
      <Modal visible={shareVisible} transparent animationType="fade" onRequestClose={() => setShareVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Share profile</Text>
            <Pressable style={styles.optionRow} onPress={shareViaSMS}>
              <Text style={styles.optionText}>Share via SMS</Text>
            </Pressable>
            <Pressable style={styles.optionRow} onPress={shareViaWhatsApp}>
              <Text style={styles.optionText}>Share via WhatsApp</Text>
            </Pressable>
            <Pressable style={styles.optionRow} onPress={shareViaTwitter}>
              <Text style={styles.optionText}>Share on Twitter</Text>
            </Pressable>
            <Pressable style={styles.optionRow} onPress={shareViaFacebook}>
              <Text style={styles.optionText}>Share on Facebook</Text>
            </Pressable>
            <Pressable style={styles.optionRow} onPress={openSystemShare}>
              <Text style={styles.optionText}>Open system share sheet</Text>
            </Pressable>
            <Pressable style={[styles.optionRow, styles.cancelRow]} onPress={() => setShareVisible(false)}>
              <Text style={[styles.optionText, styles.cancelText]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    marginBottom: 24,
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 12,
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 28,
    marginRight: 16,
  },
  verifyBadge: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  verifyBadgeText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  role: {
    color: COLORS.textSecondary,
    marginTop: 6,
    fontSize: 14,
  },
  chipRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  chip: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  chipText: {
    fontWeight: '700',
    color: '#0F2D6B',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    flex: 1,
    backgroundColor: '#F4B400',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  headerButtonText: {
    color: '#0F2D6B',
    fontWeight: '700',
  },
  saveButton: {
    backgroundColor: '#10B981',
  },
  saveButtonText: {
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    color: '#0F2D6B',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  inputSmall: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statsCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  statsLabel: {
    color: '#64748B',
    marginBottom: 8,
    fontSize: 12,
  },
  statsValue: {
    color: '#0F2D6B',
    fontSize: 22,
    fontWeight: '800',
  },
  boxCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2D6B',
    marginBottom: 14,
  },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  docLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docIcon: {
    color: '#F4B400',
    marginRight: 10,
    fontSize: 18,
    fontWeight: '700',
  },
  docLabel: {
    color: '#0F2D6B',
    fontSize: 15,
    fontWeight: '700',
  },
  docStatus: {
    color: '#22C55E',
    fontWeight: '700',
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  vehicleImageWrapper: {
    width: '100%',
    height: 180,
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
  },
  vehicleDetails: {
    padding: 18,
  },
  vehicleBadge: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 8,
  },
  vehicleTitle: {
    color: '#0F2D6B',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
  },
  vehicleSpecsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  vehicleSpec: {
    flex: 1,
  },
  vehicleSpecLabel: {
    color: '#94A3B8',
    fontSize: 11,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  vehicleSpecValue: {
    color: '#0F2D6B',
    fontWeight: '700',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  activityRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  activityBullet: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F4B400',
    marginRight: 14,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityTime: {
    color: '#94A3B8',
    marginBottom: 4,
    fontSize: 12,
  },
  activityTitle: {
    color: '#0F2D6B',
    fontWeight: '800',
    marginBottom: 6,
  },
  activityDetail: {
    color: '#64748B',
    fontSize: 14,
  },
  activityButton: {
    marginTop: 8,
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activityButtonText: {
    color: '#0F2D6B',
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryAction: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    marginRight: 12,
  },
  actionText: {
    fontWeight: '700',
  },
  secondaryActionText: {
    color: '#0F2D6B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2D6B',
    marginBottom: 12,
  },
  optionRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  optionText: {
    fontSize: 16,
    color: '#0F2D6B',
  },
  cancelRow: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  cancelText: {
    color: '#EF4444',
    fontWeight: '700',
  },
});

