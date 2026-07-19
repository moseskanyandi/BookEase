export type UserRole = 'passenger' | 'driver';

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  name?: string;
  phone?: string;
  createdAt?: string;
}

export type {
  Booking,
  BookingStatus,
  Location,
} from '@/components/booking/types/booking.types';
