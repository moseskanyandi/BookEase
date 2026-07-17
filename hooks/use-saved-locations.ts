import { useEffect, useState } from 'react';
import { locationService } from '../services/location-service';
import { SavedLocation } from '../types/location';

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
