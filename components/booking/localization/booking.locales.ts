export const bookingLocales = {
  en: {
    // Shared
    back: '← Back',
    goBack: 'Go Back',
    pickup: 'Pickup',
    dropoff: 'Dropoff',
    error: 'Error',
    success: 'Success',
    mapWebOnly: 'Map works on phone only 📱',

    // Passenger home
    brandName: 'BookEase',
    whereTo: 'Where to?',
    bookARide: 'Book a Ride',
    viewRideHistory: 'View Ride History',

    // Passenger history
    myRides: 'My Rides',
    upcoming: 'Upcoming',
    past: 'Past',
    loadingRides: 'Loading your rides...',
    noRidesInCategory: 'No rides found in this category.',
    assigned: 'Assigned',
    searchingForDriver: 'Searching for driver...',

    // Passenger details
    fetchingRideDetails: 'Fetching ride details...',
    bookingNotFound: 'Booking not found.',
    findingDriver: 'Finding driver... (Broadcasted to nearby drivers)',
    noDriverAssigned: 'No driver was assigned to this ride.',
    loadingDriverInfo: 'Loading Driver Info...',
    estimatedFare: 'Estimated Fare',
    created: 'Created',
    cancelRide: 'Cancel Ride',
    cancelRideTitle: 'Cancel Ride?',
    cancelRideMessage: 'Are you sure you want to cancel this ride request?',
    cancelNo: 'No',
    cancelYes: 'Yes, Cancel',
    cancelSuccess: 'Ride cancelled successfully.',
    cancelFailed: 'Failed to cancel ride.',

    // Driver requests list
    availableRequests: 'Available Requests',
    fetchingRequests: 'Fetching available requests...',
    noRequests: 'No requests available right now.',
    noRequestsSubtitle: 'We will notify you when a passenger requests a ride.',
    tapToView: 'Tap to View Request →',
    pickupLabel: 'Pickup:',
    dropoffLabel: 'Dropoff:',

    // Driver details
    fetchingBookingDetails: 'Fetching booking details...',
    bookingNotFoundOrDeleted: 'Booking not found or has been deleted.',
    mustBeLoggedIn: 'You must be logged in.',
    acceptedTitle: 'Accepted!',
    acceptedMessage: 'You have successfully accepted this ride request.',
    acceptFailed: 'Failed to accept booking.',
    updated: 'Updated',
    rideStarted: 'Ride has started.',
    rideCompleted: 'Ride completed successfully.',
    updateFailed: 'Failed to update status.',
    fare: 'Fare',
    decline: 'Decline',
    accept: 'Accept',
    startRide: 'Start Ride (Passenger Onboard)',
    completeRide: 'Complete Ride (Arrived at Destination)',
    rideIsCompleted: 'This ride is completed.',
    rideWasCancelled: 'This ride request was cancelled.',
    assignedToAnother: 'This ride is already assigned to another driver.',
  },
} as const;

export type BookingLocale = typeof bookingLocales.en;
export type BookingLocaleKey = keyof BookingLocale;

const DEFAULT_LOCALE = 'en' as const;

export function t(key: BookingLocaleKey): string {
  return bookingLocales[DEFAULT_LOCALE][key];
}
