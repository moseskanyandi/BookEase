import { useRouter } from 'expo-router';
import BookMinibusScreen from '@/screens/book-minibus-screen';

export default function Book() {
  const router = useRouter();
  return (
    <BookMinibusScreen
      onBookingConfirmed={(tripId) => {
        router.push(`/(passenger)/booking-details?id=${tripId}` as any);
      }}
    />
  );
}
