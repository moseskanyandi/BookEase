import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';
import { SavedLocation } from '../types/location';

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

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    marginRight: spacing.sm,
  },
  label: { color: colors.white, ...typography.caption },
});
