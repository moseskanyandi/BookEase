import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { UIColors } from '@/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: UIColors.white,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    color: UIColors.lightGray,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  subHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: UIColors.white,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginTop: 32,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 15,
    color: UIColors.whiteTranslucent,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginTop: 12,
    lineHeight: 22,
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    gap: 28,
    paddingHorizontal: 24,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  featureItem: {
    alignItems: 'center',
    gap: 10,
  },
  featureIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: UIColors.navyTranslucent,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureLabel: {
    color: UIColors.lightGray,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
