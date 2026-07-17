import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/theme';
import { SavedLocation } from '../types/location';
import { savedLocationChipStyles as styles } from './saved-location-chip.styles';

const ICON_MAP: Record<SavedLocation['icon'], keyof typeof Ionicons.glyphMap> = {
  home: 'home-outline',
  work: 'briefcase-outline',
  add: 'add-circle-outline',
};

export default function SavedLocationChip({ location, onPress }: { location: SavedLocation; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.chip} onPress={onPress}>
      <Ionicons name={ICON_MAP[location.icon]} size={16} color={colors.white} />
      <Text style={styles.label}>{location.label}</Text>
    </TouchableOpacity>
  );
}
