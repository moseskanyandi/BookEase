import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  formatBookingDate,
  getEstimatedFareAmount,
  getStableFare,
  getStableRouteStats,
  getStatusBadgeColor,
  getStatusColor,
  isUpcomingStatus,
} from '../constants/booking.constants';
import { t } from '../localization/booking.locales';
import {
  acceptBooking,
  getDriverProfile,
  subscribeToBooking,
  subscribeToPassengerBookings,
  subscribeToPendingBookings,
  updateBookingStatus,
} from '../services/bookingService';
import type {
  Booking,
  DriverProfile,
  DriverStatusUpdate,
  HistoryTab,
} from '../types/booking.types';

export function useBooking(bookingId: string | undefined) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      setBooking(null);
      setFetching(false);
      return;
    }

    setFetching(true);
    const unsubscribe = subscribeToBooking(bookingId, (data) => {
      setBooking(data);
      setFetching(false);
    });
    return unsubscribe;
  }, [bookingId]);

  return { booking, fetching };
}

export function usePendingBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToPendingBookings((data) => {
      setBookings(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { bookings, loading };
}

export function usePassengerBookings(passengerId: string | undefined) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!passengerId) {
      setBookings([]);
      setFetching(false);
      return;
    }

    setFetching(true);
    const unsubscribe = subscribeToPassengerBookings(passengerId, (data) => {
      setBookings(data);
      setFetching(false);
    });
    return unsubscribe;
  }, [passengerId]);

  return { bookings, fetching };
}

export function useDriverDetails(driverId: string | undefined) {
  const [driver, setDriver] = useState<DriverProfile | null>(null);

  useEffect(() => {
    if (!driverId) {
      setDriver(null);
      return;
    }

    let cancelled = false;
    getDriverProfile(driverId).then(({ profile, error }) => {
      if (cancelled) return;
      if (error) {
        console.error('Error fetching driver profile:', error);
        return;
      }
      setDriver(profile);
    });

    return () => {
      cancelled = true;
    };
  }, [driverId]);

  return { driver };
}

export function filterPassengerBookings(
  bookings: Booking[],
  tab: HistoryTab
): Booking[] {
  return bookings.filter((b) => {
    const upcoming = isUpcomingStatus(b.status);
    return tab === 'upcoming' ? upcoming : !upcoming;
  });
}

export function useBookingActions(bookingId: string | undefined) {
  const [submitting, setSubmitting] = useState(false);

  const cancelBooking = async (onSuccess?: () => void) => {
    if (!bookingId) return;

    Alert.alert(t('cancelRideTitle'), t('cancelRideMessage'), [
      { text: t('cancelNo') },
      {
        text: t('cancelYes'),
        style: 'destructive',
        onPress: async () => {
          try {
            setSubmitting(true);
            const { error } = await updateBookingStatus(bookingId, 'cancelled');
            if (error) {
              Alert.alert(t('error'), error);
              return;
            }
            Alert.alert(t('success'), t('cancelSuccess'));
            onSuccess?.();
          } catch (err: any) {
            Alert.alert(t('error'), err.message || t('cancelFailed'));
          } finally {
            setSubmitting(false);
          }
        },
      },
    ]);
  };

  const acceptRide = async (driverId: string | undefined, onSuccess?: () => void) => {
    if (!bookingId) return;
    if (!driverId) {
      Alert.alert(t('error'), t('mustBeLoggedIn'));
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await acceptBooking(bookingId, driverId);
      if (error) {
        Alert.alert(t('error'), error);
        return;
      }
      Alert.alert(t('acceptedTitle'), t('acceptedMessage'));
      onSuccess?.();
    } catch (err: any) {
      Alert.alert(t('error'), err.message || t('acceptFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (status: DriverStatusUpdate, onSuccess?: () => void) => {
    if (!bookingId) return;

    try {
      setSubmitting(true);
      const { error } = await updateBookingStatus(bookingId, status);
      if (error) {
        Alert.alert(t('error'), error);
        return;
      }
      Alert.alert(
        t('updated'),
        status === 'in_progress' ? t('rideStarted') : t('rideCompleted')
      );
      onSuccess?.();
    } catch (err: any) {
      Alert.alert(t('error'), err.message || t('updateFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    cancelBooking,
    acceptRide,
    updateStatus,
  };
}

export const bookingHelpers = {
  formatBookingDate,
  getEstimatedFareAmount,
  getStableFare,
  getStableRouteStats,
  getStatusBadgeColor,
  getStatusColor,
  isUpcomingStatus,
};
