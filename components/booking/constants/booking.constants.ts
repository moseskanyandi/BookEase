import type { BookingStatus, RouteStats } from '../types/booking.types';

export const BOOKING_COLORS = {
  primary: '#0F2D6B',
  navy: '#0F2D6B',
  secondary: '#F48400',
  yellow: '#F48400',
  bg: '#F2F2F2',
  white: '#FFFFFF',
  gray: '#6B7280',
  danger: '#EF4444',
  success: '#10B981',
  border: '#e5e7eb',
  mutedBorder: '#f3f4f6',
  mutedBg: '#f3f4f6',
  line: '#D1D5DB',
} as const;

export const DEFAULT_COORDINATES = {
  pickup: { latitude: -15.3875, longitude: 28.3228 },
  destination: { latitude: -15.42, longitude: 28.35 },
} as const;

export const DEFAULT_DRIVER_AVATAR = 'https://i.pravatar.cc/100';
export const DEFAULT_CAR_LABEL = 'Toyota Axio • ABC 123';
export const DEFAULT_FARE = 80;

export const UPCOMING_STATUSES: BookingStatus[] = [
  'pending',
  'accepted',
  'in_progress',
];

export const MONTH_ABBREVIATIONS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
] as const;

export const STATUS_COLOR_MAP: Record<BookingStatus, string> = {
  pending: BOOKING_COLORS.secondary,
  accepted: BOOKING_COLORS.primary,
  in_progress: BOOKING_COLORS.primary,
  completed: BOOKING_COLORS.success,
  cancelled: BOOKING_COLORS.danger,
};

export function getNumericIdSeed(id: string): number {
  return parseInt(id.replace(/\D/g, ''), 10) || 42;
}

export function get_stable_route_stats(id: string): RouteStats {
  const numericId = getNumericIdSeed(id);
  const distanceVal = (numericId % 70) / 10 + 2;
  return {
    distance: `${distanceVal.toFixed(1)} km`,
    time: `${Math.round(distanceVal * 2.5)} mins`,
    fare: `K${numericId % 100 || DEFAULT_FARE}`,
  };
}

export function get_stable_fare(id: string): string {
  return get_stable_route_stats(id).fare;
}

export function getEstimatedFareAmount(id: string): number {
  return getNumericIdSeed(id) % 100 || DEFAULT_FARE;
}

export function getStatusColor(status: BookingStatus | string): string {
  return STATUS_COLOR_MAP[status as BookingStatus] ?? BOOKING_COLORS.gray;
}

export function getStatusBadgeColor(status: BookingStatus | string): string {
  if (status === 'cancelled') return BOOKING_COLORS.danger;
  if (status === 'completed') return BOOKING_COLORS.success;
  return BOOKING_COLORS.secondary;
}

export function formatBookingDate(isoString: string): { day: string; time: string } {
  if (!isoString) return { day: 'N/A', time: 'N/A' };
  try {
    const date = new Date(isoString);
    const day = `${MONTH_ABBREVIATIONS[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}`;
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { day, time };
  } catch {
    return { day: 'TODAY', time: '12:00 PM' };
  }
}

export function formatBookingTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isUpcomingStatus(status: BookingStatus): boolean {
  return UPCOMING_STATUSES.includes(status);
}

export const getStableFare = (booking: any) => {
  // temporary placeholder so it stops erroring
  return booking?.fare || booking?.estimatedFare || 0;
};
