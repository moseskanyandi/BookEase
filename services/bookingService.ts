import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import app from '@/api/firebase';
import type { Booking } from '@/components/booking/types/booking.types';

const db = getFirestore(app);
const BOOKINGS_COLLECTION = 'bookings';

/**
 * Driver: listen to pending booking requests in real time
 */
export function subscribeToAvailableBookings(
  callback: (bookings: Booking[]) => void
) {
  const q = query(
    collection(db, BOOKINGS_COLLECTION),
    where('status', '==', 'pending')
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const bookings = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Booking[];
      callback(bookings);
    },
    (error) => {
      console.error('subscribeToAvailableBookings error:', error);
      callback([]);
    }
  );
}

/**
 * Driver: accept a pending booking
 */
export async function acceptBooking(bookingId: string, driverId: string) {
  const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
  await updateDoc(bookingRef, {
    status: 'accepted',
    driverId,
    acceptedAt: serverTimestamp(),
    updatedAt: new Date().toISOString(),
  });
}
