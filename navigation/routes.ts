export const ROUTES = {
  PASSENGER: {
    BOOK: '/(passenger)',
    STATUS: (tripId: string) => `/(passenger)/status/${tripId}`,
  },
} as const;
