import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { primaryButtonStyles as styles } from './primary-button.styles';

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
