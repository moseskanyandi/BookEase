import { config } from '../constants/config';

const delay = () => new Promise((resolve) => setTimeout(resolve, config.MOCK_NETWORK_DELAY_MS));

export const tripService = {
  async confirmBooking(payload: { destination: string }): Promise<{ tripId: string }> {
    await delay();
    console.log('Booking confirmed for:', payload.destination);
    return { tripId: 't4' }; // stand-in until a real booking API exists
  },
};
