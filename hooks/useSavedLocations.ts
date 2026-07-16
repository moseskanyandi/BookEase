import { useEffect, useState } from 'react';
import { SavedLocation } from '../types/location';
import { locationService } from '../services/locationService';

export function useSavedLocations() {
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    locationService.getSavedLocations().then((data) => {
      if (isMounted) {
        setLocations(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return { locations, isLoading };
}
