import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';

export const savedLocationChipStyles = StyleSheet.create({
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
