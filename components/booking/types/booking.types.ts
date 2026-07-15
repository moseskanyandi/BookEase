export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}

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

export type HistoryTab = 'upcoming' | 'past';

export interface RouteStats {
  distance: string;
  time: string;
  fare: string;
}

export interface DriverProfile {
  name?: string;
  car?: string;
  phone?: string;
  email?: string;
}

export type DriverStatusUpdate = Extract<BookingStatus, 'in_progress' | 'completed'>;
