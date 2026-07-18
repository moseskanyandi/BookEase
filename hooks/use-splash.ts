import { useEffect } from 'react';
import { router } from 'expo-router';

const REDIRECT_DELAY_MS = 6000;

/**
 * Handles the Splash screen's auto-navigation logic.
 * Waits REDIRECT_DELAY_MS ms then replaces the route with /welcome.
 */
export function useSplash(): void {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);
}
