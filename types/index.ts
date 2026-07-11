export type UserRole = 'passenger' | 'driver';

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  name?: string;
  phone?: string;
  createdAt?: string;
}

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  passengerId: string;
  driverId?: string;
  pickup: Location;
  destination: Location;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}