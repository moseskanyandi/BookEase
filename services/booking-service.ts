
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
    export function subscribe_to_available_bookings(
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
          console.error('subscribe_to_available_bookings error:', error);
          callback([]);
        }
      );
    }

    /**
     * Driver: accept a pending booking
     */
    export async function accept_booking(booking_id: string, driver_id: string) {
      const booking_ref = doc(db, BOOKINGS_COLLECTION, booking_id);
      await updateDoc(booking_ref, {
        status: 'accepted',
        driver_id,
        accepted_at: serverTimestamp(),
        updated_at: new Date().toISOString(),
      });
    }


