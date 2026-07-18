import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { UIColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: UIColors.white,
  },
  tagline: {
    fontSize: 16,
    color: UIColors.lightGray,
    marginTop: 8,
  },
});
