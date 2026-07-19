import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

export const primaryButtonStyles = StyleSheet.create({
  base: { borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center' },
  filled: { backgroundColor: colors.primary },
  filledText: { color: colors.background, fontWeight: '700', fontSize: 16 },
  outline: { borderWidth: 1, borderColor: colors.border },
  outlineText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
