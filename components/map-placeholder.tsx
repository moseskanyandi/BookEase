import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../constants/theme';
import { mapPlaceholderStyles as styles } from './map-placeholder.styles';

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
