import React, { useMemo, useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
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

type PreferenceItem = {
  id: string;
  label: string;
  icon: string;
  enabled: boolean;
};

type PaymentMethod = {
  id: string;
  label: string;
  details: string;
  primary?: boolean;
};

const profile = {
  name: 'Alex Thompson',
  role: 'Passenger',
  email: 'alex.thompson@example.com',
  phone: '+1 (555) 0123-4567',
  memberSince: '2022',
  membership: 'Book Ease Gold',
  points: 12450,
  tripsThisMonth: 24,
  carbonSaved: '12 kg',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
};

const savedPlaces = [
  {
    id: 'home',
    label: 'Home',
    address: '123 Emerald Heights, Downtown',
    icon: 'home',
  },
  {
    id: 'work',
    label: 'Work',
    address: 'Tech Plaza North, 4th Floor',
    icon: 'work',
  },
];

const initialPreferences: PreferenceItem[] = [
  { id: 'ac', label: 'A/C Required', icon: 'ac_unit', enabled: true },
  { id: 'quiet', label: 'Quiet Ride', icon: 'volume_off', enabled: true },
  { id: 'accessibility', label: 'Accessibility Access', icon: 'accessibility', enabled: false },
  { id: 'alerts', label: 'Arrival Alerts', icon: 'notifications_active', enabled: true },
];

const initialPaymentMethods: PaymentMethod[] = [
  { id: 'visa', label: 'Visa ending in 4242', details: 'Expires 12/26', primary: true },
  { id: 'apple', label: 'Apple Pay', details: 'Connected' },
  { id: 'airtel', label: 'Airtel Money', details: '+254 700 000000' },
  { id: 'mtn', label: 'MTN Mobile Money', details: '+256 700 000000' },
];

export default function PassengerProfile() {
  const [preferences, setPreferences] = useState<PreferenceItem[]>(initialPreferences);
  const [editMode, setEditMode] = useState(false);
  const [profileState, setProfileState] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [addPaymentVisible, setAddPaymentVisible] = useState(false);
  const [addMethodType, setAddMethodType] = useState<string | null>(null);
  const [addLabel, setAddLabel] = useState('');
  const [addAccount, setAddAccount] = useState('');
  const [addDetails, setAddDetails] = useState('');
  const [addPayPalName, setAddPayPalName] = useState('');
  const [addMobileNetwork, setAddMobileNetwork] = useState('');
  const [addCardHolder, setAddCardHolder] = useState('');
  const [addCardNumber, setAddCardNumber] = useState('');
  const [addCardExpiry, setAddCardExpiry] = useState('');
  const [addCardCvc, setAddCardCvc] = useState('');

  const togglePreference = (id: string) => {
    setPreferences((current) =>
      current.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const membershipLabel = useMemo(
    () => (profile.points >= 10000 ? 'Gold Member' : 'Member'),
    []
  );

  const handleAction = (title: string) => {
    Alert.alert(title, `The ${title.toLowerCase()} feature is coming soon.`);
  };

  const startEdit = () => setEditMode(true);
  const cancelEdit = () => {
    setProfileState({ name: profile.name, email: profile.email, phone: profile.phone });
    setEditMode(false);
  };

  const saveProfile = () => {
    if (!profileState.email || !profileState.phone) {
      Alert.alert('Validation', 'Email and phone are required');
      return;
    }
    // TODO: persist to backend
    Alert.alert('Saved', 'Profile updated locally');
    setEditMode(false);
  };

  const openAddPayment = () => {
    setAddMethodType(null);
    setAddLabel('');
    setAddAccount('');
    setAddDetails('');
    setAddPayPalName('');
    setAddMobileNetwork('');
    setAddCardHolder('');
    setAddCardNumber('');
    setAddCardExpiry('');
    setAddCardCvc('');
    setAddPaymentVisible(true);
  };

  const saveNewPayment = () => {
    if (!addMethodType) {
      Alert.alert('Validation', 'Please choose a payment method type.');
      return;
    }

    let label = '';
    let details = '';

    if (addMethodType === 'paypal') {
      if (!addLabel || !addPayPalName) {
        Alert.alert('Validation', 'Please enter PayPal email and account name.');
        return;
      }
      label = `PayPal — ${addLabel}`;
      details = `Name: ${addPayPalName}`;
      if (addDetails) details += ` • Notes: ${addDetails}`;
    } else if (addMethodType === 'mobile_money') {
      if (!addLabel || !addAccount || !addMobileNetwork) {
        Alert.alert('Validation', 'Please enter phone number, account name, and network.');
        return;
      }
      label = `${addMobileNetwork} • ${addLabel}`;
      details = `Account Name: ${addAccount}`;
      if (addDetails) details += ` • Notes: ${addDetails}`;
    } else if (addMethodType === 'bank') {
      if (!addLabel || !addAccount || !addDetails) {
        Alert.alert('Validation', 'Please enter bank name, account number, and branch/SWIFT.');
        return;
      }
      label = `Bank — ${addLabel}`;
      details = `Acct: ${addAccount} • ${addDetails}`;
    } else if (addMethodType === 'card') {
      if (!addCardNumber || !addCardExpiry || !addCardCvc || !addCardHolder) {
        Alert.alert('Validation', 'Please enter card number, expiry, CVC, and cardholder name.');
        return;
      }
      label = `Card — ${addCardNumber.slice(-4)}`;
      details = `Name: ${addCardHolder} • Exp: ${addCardExpiry} • CVC: ${addCardCvc}`;
    }

    const id = `${addMethodType}-${Date.now()}`;
    const newMethod: PaymentMethod = {
      id,
      label,
      details,
    };

    setPaymentMethods((p) => [newMethod, ...p]);
    setAddPaymentVisible(false);
    setAddMethodType(null);
    Alert.alert('Added', `${label} added to payment methods`);
  };

  const removePaymentMethod = (id: string) => {
    const method = paymentMethods.find((item) => item.id === id);
    if (!method) return;

    Alert.alert(
      'Remove payment method',
      `Remove ${method.label}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setPaymentMethods((methods) => methods.filter((item) => item.id !== id)),
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.profileRow}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <View style={styles.profileText}>
            {!editMode ? (
              <Text style={styles.name}>{profileState.name}</Text>
            ) : (
              <TextInput value={profileState.name} onChangeText={(t) => setProfileState((s) => ({ ...s, name: t }))} style={styles.input} />
            )}
            {!editMode ? (
              <Text style={styles.subtext}>Premium Member since {profile.memberSince}</Text>
            ) : (
              <TextInput value={profileState.email} onChangeText={(t) => setProfileState((s) => ({ ...s, email: t }))} style={styles.input} placeholder="Email" />
            )}
            {!editMode && <Text style={styles.subtext}>Phone: {profileState.phone}</Text>}
            {editMode && (
              <TextInput value={profileState.phone} onChangeText={(t) => setProfileState((s) => ({ ...s, phone: t }))} style={styles.input} placeholder="Phone" />
            )}
          </View>
        </View>
        <View style={styles.headerButtons}>
          {!editMode ? (
            <Pressable style={styles.headerButton} onPress={startEdit}>
              <Text style={styles.headerButtonText}>Edit Profile</Text>
            </Pressable>
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
        <View style={styles.badgeCard}>
          <View style={styles.badgeBackground} />
          <View style={styles.badgeContent}>
            <View>
              <Text style={styles.badgeLabel}>Membership Status</Text>
              <Text style={styles.badgeTitle}>{profile.membership}</Text>
            </View>
            <Text style={styles.badgeEmoji}>⭐</Text>
          </View>
          <View style={styles.badgeStats}>
            <View>
              <Text style={styles.badgeStatLabel}>Loyalty Points</Text>
              <Text style={styles.badgeStatValue}>{profile.points.toLocaleString()} pts</Text>
            </View>
            <Pressable style={styles.redeemButton} onPress={() => handleAction('Redeem')}>
              <Text style={styles.redeemButtonText}>Redeem</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Trips This Month</Text>
          <Text style={styles.statValue}>{profile.tripsThisMonth}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Carbon Saved</Text>
          <Text style={styles.statValue}>{profile.carbonSaved}</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email Address</Text>
          <Text style={styles.detailValue}>{profile.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone Number</Text>
          <Text style={styles.detailValue}>{profile.phone}</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved Places</Text>
        </View>
        {savedPlaces.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => handleAction(item.label)}
            style={styles.placeRow}
          >
            <View style={styles.placeIcon}>
              <Text style={styles.placeIconText}>{item.icon.substring(0, 1).toUpperCase()}</Text>
            </View>
            <View style={styles.placeText}>
              <Text style={styles.placeLabel}>{item.label}</Text>
              <Text style={styles.placeAddress}>{item.address}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ride Preferences</Text>
        </View>
        {preferences.map((item) => (
          <View key={item.id} style={styles.preferenceRow}>
            <View>
              <Text style={styles.preferenceLabel}>{item.label}</Text>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => togglePreference(item.id)}
              thumbColor={item.enabled ? '#F4B400' : '#fff'}
              trackColor={{ false: '#d1d5db', true: '#fde68a' }}
            />
          </View>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
        </View>
        {paymentMethods.map((method) => (
          <View
            key={method.id}
            style={[
              styles.paymentRow,
              method.primary && styles.paymentPrimary,
            ]}
          >
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentLabel}>{method.label}</Text>
              <Text style={styles.paymentSubtext}>{method.details}</Text>
            </View>
            <View style={styles.paymentActions}>
              {method.primary && (
                <Text style={styles.primaryBadge}>Primary</Text>
              )}
              <Pressable
                style={styles.removeButton}
                onPress={() => removePaymentMethod(method.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        ))}
        <Pressable style={styles.addPaymentButton} onPress={openAddPayment}>
          <Text style={styles.addPaymentButtonText}>Add New Payment Method</Text>
        </Pressable>
        <Modal visible={addPaymentVisible} transparent animationType="slide" onRequestClose={() => setAddPaymentVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              {!addMethodType ? (
                <>
                  <Text style={styles.modalTitle}>Add payment method</Text>
                  <Pressable style={styles.optionRow} onPress={() => setAddMethodType('paypal')}>
                    <Text style={styles.optionText}>PayPal</Text>
                  </Pressable>
                  <Pressable style={styles.optionRow} onPress={() => setAddMethodType('mobile_money')}>
                    <Text style={styles.optionText}>Mobile Money (Airtel / MTN)</Text>
                  </Pressable>
                  <Pressable style={styles.optionRow} onPress={() => setAddMethodType('bank')}>
                    <Text style={styles.optionText}>Bank Transfer</Text>
                  </Pressable>
                  <Pressable style={styles.optionRow} onPress={() => setAddMethodType('card')}>
                    <Text style={styles.optionText}>Credit / Debit Card</Text>
                  </Pressable>
                  <Pressable style={[styles.optionRow, styles.cancelRow]} onPress={() => setAddPaymentVisible(false)}>
                    <Text style={[styles.optionText, styles.cancelText]}>Cancel</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Text style={styles.modalTitle}>Add {addMethodType === 'paypal' ? 'PayPal' : addMethodType === 'mobile_money' ? 'Mobile Money' : addMethodType === 'bank' ? 'Bank Transfer' : 'Card'} method</Text>
                  {addMethodType === 'paypal' && (
                    <>
                      <Text style={styles.fieldLabel}>PayPal Email</Text>
                      <TextInput
                        placeholder="you@example.com"
                        value={addLabel}
                        onChangeText={setAddLabel}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                      <Text style={styles.fieldLabel}>Account Holder Name</Text>
                      <TextInput
                        placeholder="Your name or business"
                        value={addAccount}
                        onChangeText={setAddAccount}
                        style={styles.input}
                      />
                      <Text style={styles.fieldLabel}>Notes (optional)</Text>
                      <TextInput
                        placeholder="e.g. primary PayPal account"
                        value={addDetails}
                        onChangeText={setAddDetails}
                        style={styles.input}
                      />
                    </>
                  )}
                  {addMethodType === 'mobile_money' && (
                    <>
                      <Text style={styles.fieldLabel}>Phone Number</Text>
                      <TextInput
                        placeholder="+254 700 000 000"
                        value={addLabel}
                        onChangeText={setAddLabel}
                        style={styles.input}
                        keyboardType="phone-pad"
                      />
                      <Text style={styles.fieldLabel}>Account Holder Name</Text>
                      <TextInput
                        placeholder="Passenger name"
                        value={addAccount}
                        onChangeText={setAddAccount}
                        style={styles.input}
                      />
                      <Text style={styles.fieldLabel}>Network</Text>
                      <TextInput
                        placeholder="Airtel Money or MTN Mobile Money"
                        value={addDetails}
                        onChangeText={setAddDetails}
                        style={styles.input}
                      />
                    </>
                  )}
                  {addMethodType === 'bank' && (
                    <>
                      <Text style={styles.fieldLabel}>Bank Name</Text>
                      <TextInput
                        placeholder="Bank name"
                        value={addLabel}
                        onChangeText={setAddLabel}
                        style={styles.input}
                      />
                      <Text style={styles.fieldLabel}>Account Number</Text>
                      <TextInput
                        placeholder="1234567890"
                        value={addAccount}
                        onChangeText={setAddAccount}
                        style={styles.input}
                        keyboardType="numeric"
                      />
                      <Text style={styles.fieldLabel}>Branch / SWIFT Code</Text>
                      <TextInput
                        placeholder="Branch name or SWIFT code"
                        value={addDetails}
                        onChangeText={setAddDetails}
                        style={styles.input}
                      />
                    </>
                  )}
                  {addMethodType === 'card' && (
                    <>
                      <Text style={styles.fieldLabel}>Cardholder Name</Text>
                      <TextInput
                        placeholder="Name on card"
                        value={addCardHolder}
                        onChangeText={setAddCardHolder}
                        style={styles.input}
                      />
                      <Text style={styles.fieldLabel}>Card Number</Text>
                      <TextInput
                        placeholder="1234 5678 9012 3456"
                        value={addCardNumber}
                        onChangeText={setAddCardNumber}
                        style={styles.input}
                        keyboardType="numeric"
                      />
                      <Text style={styles.fieldLabel}>Expiry Date</Text>
                      <TextInput
                        placeholder="MM/YY"
                        value={addCardExpiry}
                        onChangeText={setAddCardExpiry}
                        style={styles.input}
                        keyboardType="numeric"
                      />
                      <Text style={styles.fieldLabel}>CVC</Text>
                      <TextInput
                        placeholder="123"
                        value={addCardCvc}
                        onChangeText={setAddCardCvc}
                        style={styles.input}
                        keyboardType="numeric"
                        secureTextEntry
                      />
                    </>
                  )}
                  <Pressable style={[styles.headerButton, styles.saveButton]} onPress={saveNewPayment}>
                    <Text style={[styles.headerButtonText, styles.saveButtonText]}>Save</Text>
                  </Pressable>
                  <Pressable style={[styles.headerButton, styles.cancelButton]} onPress={() => setAddMethodType(null)}>
                    <Text style={[styles.headerButtonText, styles.cancelButtonText]}>Back</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={[styles.actionButton, styles.secondaryButton]} onPress={() => handleAction('Sign Out')}>
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Sign Out</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.dangerButton]} onPress={() => handleAction('Delete Account')}>
          <Text style={[styles.actionButtonText, styles.dangerButtonText]}>Delete Account</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
  },
  headerCard: {
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
    marginBottom: 20,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.border,
    marginRight: 16,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
  },
  badgeCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
  },
  badgeBackground: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(244, 180, 0, 0.16)',
  },
  badgeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  badgeLabel: {
    color: COLORS.surface,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  badgeTitle: {
    color: COLORS.surface,
    fontSize: 20,
    fontWeight: '800',
  },
  badgeEmoji: {
    fontSize: 30,
  },
  badgeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  badgeStatLabel: {
    color: '#E2E8F0',
    fontSize: 12,
    marginBottom: 4,
  },
  badgeStatValue: {
    color: COLORS.secondary,
    fontSize: 20,
    fontWeight: '800',
  },
  redeemButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  redeemButtonText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  headerButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginLeft: 8,
  },
  headerButtonText: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    color: COLORS.surface,
  },
  cancelButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.primary,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    color: COLORS.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 45, 107, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '92%',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 18,
  },
  optionRow: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  fieldLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '600',
  },
  cancelRow: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  cancelText: {
    color: '#EF4444',
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: '800',
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  placeIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  placeIconText: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '700',
  },
  placeText: {
    flex: 1,
  },
  placeLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
  placeAddress: {
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  preferenceLabel: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '600',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  paymentInfo: {
    flex: 1,
    marginRight: 12,
  },
  paymentActions: {
    alignItems: 'flex-end',
  },
  removeButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
  },
  removeButtonText: {
    color: '#B91C1C',
    fontWeight: '700',
  },
  paymentPrimary: {
    borderColor: COLORS.secondary,
    borderWidth: 1,
  },
  paymentLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
  paymentSubtext: {
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  primaryBadge: {
    color: COLORS.primary,
    backgroundColor: '#FDE68A',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '700',
  },
  addPaymentButton: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
  },
  addPaymentButtonText: {
    color: COLORS.surface,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  actionButtonText: {
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
  dangerButton: {
    backgroundColor: '#FEE2E2',
  },
  dangerButtonText: {
    color: '#B91C1C',
  },
});

