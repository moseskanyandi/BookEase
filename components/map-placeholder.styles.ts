import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

export const mapPlaceholderStyles = StyleSheet.create({
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
