import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from 'react-native';
import { colors, spacing, radius } from '../constants/theme';

interface Props {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'filled' | 'outline';
  style?: ViewStyle;
}

export default function PrimaryButton({ label, onPress, variant = 'filled', style }: Props) {
  const isOutline = variant === 'outline';
  return (
    <TouchableOpacity style={[styles.base, isOutline ? styles.outline : styles.filled, style]} onPress={onPress}>
      <Text style={isOutline ? styles.outlineText : styles.filledText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center' },
  filled: { backgroundColor: colors.primary },
  filledText: { color: colors.background, fontWeight: '700', fontSize: 16 },
  outline: { borderWidth: 1, borderColor: colors.border },
  outlineText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
