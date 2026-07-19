import { router } from 'expo-router';
import { ROUTES } from './routes';

export const navigation = {
  goToTripStatus: (tripId: string) => router.push(ROUTES.PASSENGER.STATUS(tripId)),
};
