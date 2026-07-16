import { SavedLocation } from '../types/location';
import { config } from '../constants/config';

const MOCK_SAVED_LOCATIONS: SavedLocation[] = [
  { id: 'home', label: 'Home', address: 'Woodlands, Lusaka', icon: 'home' },
  { id: 'work', label: 'Work', address: 'Cairo Road, Lusaka', icon: 'work' },
  { id: 'add', label: 'Add Saved', address: '', icon: 'add' },
];

const delay = () => new Promise((resolve) => setTimeout(resolve, config.MOCK_NETWORK_DELAY_MS));

export const locationService = {
  async getSavedLocations(): Promise<SavedLocation[]> {
    await delay();
    return MOCK_SAVED_LOCATIONS;
  },
};
