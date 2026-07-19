import { StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../constants/theme';

export const bookMinibusScreenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  headerTitle: { ...typography.h1, color: colors.white },
  avatar: { width: 36, height: 36, borderRadius: radius.full, backgroundColor: colors.surfaceLight },
  savedRow: { gap: spacing.sm, paddingBottom: spacing.md },
  inputCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  inputText: { color: colors.white, ...typography.body },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  textInput: { flex: 1, color: colors.white, ...typography.body },
});
