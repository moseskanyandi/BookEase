import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import MapPlaceholder from '../components/map-placeholder';
import PrimaryButton from '../components/primary-button';
import SavedLocationChip from '../components/saved-location-chip';
import { colors } from '../constants/theme';
import { useSavedLocations } from '../hooks/use-saved-locations';
import { t } from '../localization/i18n';
import { tripService } from '../services/trip-service';
import { bookMinibusScreenStyles as styles } from './book-minibus-screen.styles';

interface Props {
  onBookingConfirmed?: (tripId: string) => void;
}

export default function BookMinibusScreen({ onBookingConfirmed }: Props) {
  const [destination, setDestination] = useState('');
  const { locations } = useSavedLocations();

  const handleConfirm = async () => {
    const { tripId } = await tripService.confirmBooking({ destination });
    onBookingConfirmed?.(tripId);
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

      <PrimaryButton label={t('booking.confirmMinibus')} onPress={handleConfirm} />
    </SafeAreaView>
  );
}
