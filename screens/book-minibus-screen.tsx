import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import MapPlaceholder from '../components/map-placeholder';
import PrimaryButton from '../components/primary-button';
import SavedLocationChip from '../components/saved-location-chip';
import { DEFAULT_COORDINATES } from '../components/booking/constants/booking.constants';
import { createBooking } from '../components/booking/services/bookingService';
import { colors } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useSavedLocations } from '../hooks/use-saved-locations';
import { bookMinibusScreenStyles as styles } from './book-minibus-screen.styles';
interface Props {
  onBookingConfirmed?: (bookingId: string) => void;
}
export default function BookMinibusScreen({ onBookingConfirmed }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [destination, setDestination] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { locations } = useSavedLocations();
  const handleConfirm = async () => {
    if (!user) {
      Alert.alert(t('error'), t('mustBeLoggedIn'));
      return;
    }
    if (!destination.trim()) {
      return;
    }
    setSubmitting(true);
    const pickup = {
      address: t('booking.currentLocation'),
      latitude: DEFAULT_COORDINATES.pickup.latitude,
      longitude: DEFAULT_COORDINATES.pickup.longitude,
    };
    const destinationLocation = {
      address: destination.trim(),
      latitude: DEFAULT_COORDINATES.destination.latitude,
      longitude: DEFAULT_COORDINATES.destination.longitude,
    };
    const { id, error } = await createBooking(user.uid, pickup, destinationLocation);
    setSubmitting(false);
    if (error || !id) {
      Alert.alert(t('error'), error || t('bookingFailed'));
      return;
    }
    onBookingConfirmed?.(id);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('common.appName')}</Text>
        <View style={styles.avatar} />
      </View>
      <MapPlaceholder />
      <FlatList
        horizontal
        data={locations}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.savedRow}
        renderItem={({ item }) => <SavedLocationChip location={item} />}
      />
      <View style={styles.inputCard}>
        <View style={styles.inputRow}>
          <View style={styles.dot} />
          <Text style={styles.inputText}>{t('booking.currentLocation')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.inputRow}>
          <Ionicons name="search" size={16} color={colors.textMuted} />
          <TextInput
            style={styles.textInput}
            placeholder={t('booking.destinationPlaceholder')}
            placeholderTextColor={colors.textMuted}
            value={destination}
            onChangeText={setDestination}
          />
        </View>
      </View>
      <PrimaryButton
        label={submitting ? t('booking.confirming') : t('booking.confirmMinibus')}
        onPress={handleConfirm}
        loading={submitting}
        disabled={submitting || !destination.trim()}
      />
    </SafeAreaView>
  );
}
