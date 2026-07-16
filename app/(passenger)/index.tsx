import React from 'react';
import { navigation } from '../../navigation';
import BookMinibusScreen from '../../screens/book-minibus-screen';

export default function Book() {
  return <BookMinibusScreen onBookingConfirmed={navigation.goToTripStatus} />;
}
