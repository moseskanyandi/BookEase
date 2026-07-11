import {
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
 getFirestore } from 'firebase/firestore';

import app from '@/api/firebase';
import { Booking, BookingStatus, Location } from '@/types';

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
    return { id: null, error: error.message };
  }
};

/**
 * Driver: accept a pending booking
 */
export const acceptBooking = async (bookingId: string, driverId: string) => {
  try {
    const bookingDoc = doc(db, 'bookings', bookingId);
    await updateDoc(bookingDoc, {
      driverId,
      status: 'accepted' as BookingStatus,
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Driver or passenger: update booking status (e.g. in_progress, completed, cancelled)
 */
export const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
  try {
    const bookingDoc = doc(db, 'bookings', bookingId);
    await updateDoc(bookingDoc, {
      status,
      updatedAt: Timestamp.now().toDate().toISOString(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Driver: subscribe to all pending bookings (available requests)
 */
export const subscribeToPendingBookings = (
  callback: (bookings: Booking[]) => void
) => {
  const q = query(bookingsRef, where('status', '==', 'pending'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
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
    const bookings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
    callback(bookings);
  });
};