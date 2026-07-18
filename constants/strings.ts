/**
 * Shared brand and marketing copy used across Splash and Welcome screens.
 * Internationalised strings (auth flow, etc.) remain in localization/en.json.
 */

export const BrandStrings = {
  /** First part of the app name, rendered in the default text colour */
  appNamePrefix: 'Book',
  /** Second part of the app name, rendered in the secondary accent colour */
  appNameSuffix: 'Ease',
  /** Full tagline displayed below the logo */
  tagline: 'Ride Easy. Book Smart.',
  /** Left decorative dash rendered around the tagline */
  taglineDashLeft: '— ',
  /** Right decorative dash rendered around the tagline */
  taglineDashRight: ' —',
} as const;

export const WelcomeStrings = {
  subHeading: 'Book Your Journey with Confidence',
  description:
    'Search routes, reserve seats, and travel across Zambia with a fast, secure, and reliable booking experience.',
  ctaButton: 'Get Started',
  featureEasyBooking: 'Easy Booking',
  featureLiveTracking: 'Live Tracking',
  featureSafeReliable: 'Safe & Reliable',
} as const;
