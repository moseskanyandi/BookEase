import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../constants/theme';

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
  children?: ReactNode;
}

// TODO: replace with a real <MapView> from react-native-maps once API keys are set up
export default function MapPlaceholder({ icon = 'map-outline', label = 'Map goes here', children }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={32} color={colors.textMuted} />
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  label: { color: colors.textMuted, marginTop: spacing.xs },
});
