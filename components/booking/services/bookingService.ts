import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import app from '@/api/firebase';
import type {
  Booking,
  BookingStatus,
  DriverProfile,
  Location,
} from '../types/booking.types';

const db = getFirestore(app);
const bookingsRef = collection(db, 'bookings');

/**
 * Passenger: create a new ride request
 */
export const createBooking = async (
  passengerId: string,
  pickup: Location,
  destination: Location
) => {
  try {
    const docRef = await addDoc(bookingsRef, {
      passengerId,
      driverId: null,
      pickup,
      destination,
      status: 'pending' as BookingStatus,
      createdAt: Timestamp.now().toDate().toISOString(),
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message as string };
  }
};

/**
 * Driver: accept a pending booking
 */
export const accept_booking = async (bookingId: string, driverId: string) => {
  try {
    const bookingDoc = doc(db, 'bookings', bookingId);
    await updateDoc(bookingDoc, {
      driverId,
      status: 'accepted' as BookingStatus,
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message as string };
  }
};

/**
 * Driver or passenger: update booking status
 */
export const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus
) => {
  try {
    const bookingDoc = doc(db, 'bookings', bookingId);
    await updateDoc(bookingDoc, {
      status,
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message as string };
  }
};

/**
 * Fetch a user profile (e.g. assigned driver)
 */
export const getDriverProfile = async (
  driverId: string
): Promise<{ profile: DriverProfile | null; error: string | null }> => {
  try {
    const snap = await getDoc(doc(db, 'users', driverId));
    if (!snap.exists()) {
      return { profile: null, error: null };
    }
    return { profile: snap.data() as DriverProfile, error: null };
  } catch (error: any) {
    return { profile: null, error: error.message as string };
  }
};

/**
 * Driver: subscribe to all pending bookings
 */
export const subscribeToPendingBookings = (
  callback: (bookings: Booking[]) => void
) => {
  const q = query(
    bookingsRef,
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Booking[];
    callback(bookings);
  });
};

/**
 * Passenger: subscribe to their own booking history
 */
export const subscribeToPassengerBookings = (
  passengerId: string,
  callback: (bookings: Booking[]) => void
) => {
  const q = query(
    bookingsRef,
    where('passengerId', '==', passengerId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Booking[];
    callback(bookings);
  });
};

/**
 * Subscribe to updates for a single booking
 */
export const subscribeToBooking = (
  bookingId: string,
  callback: (booking: Booking | null) => void
) => {
  const bookingDoc = doc(db, 'bookings', bookingId);
  return onSnapshot(bookingDoc, (snapshot) => {
    if (snapshot.exists()) {
      callback({ id: snapshot.id, ...snapshot.data() } as Booking);
    } else {
      callback(null);
    }
  });
};
