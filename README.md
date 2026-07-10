# BookEase 🚐

A minibus booking system built with React Native and Expo. Passengers can request rides, and drivers can view and accept booking requests in real time.

## 📱 Overview

BookEase connects passengers who need a ride with drivers who can fulfill it. Passengers submit a ride request with pickup and destination details, drivers view and accept available requests, and passengers get notified once a driver accepts. Both sides can track the booking through to completion.

## ✨ Features

**Passenger**
- Login / Sign up
- Request a ride (pickup & destination)
- View booking status and history
- Manage profile

**Driver**
- Login / Sign up
- View available ride requests
- Accept bookings
- Update booking status
- Manage profile

## 🛠 Tech Stack

- **Framework:** React Native (Expo, managed workflow)
- **Routing:** Expo Router (file-based)
- **Language:** TypeScript
- **Auth:** Firebase Authentication
- **Internationalization:** i18next, react-i18next, expo-localization

## 📂 Folder Structure

```
BookEase/
├── app/              # Expo Router screens (route groups: auth, passenger, driver)
├── components/       # Reusable UI components
├── screens/          # Screen-level components
├── navigation/       # Navigation helpers
├── services/         # API & Firebase service calls
├── hooks/            # Custom React hooks
├── context/          # React Context providers (e.g. Auth state)
├── constants/        # Theme, colors, static config
├── utils/            # Helper functions
├── localization/     # i18n setup & translation files
├── types/            # TypeScript types/interfaces
├── api/              # Firebase config / API client setup
└── assets/           # Images, fonts, icons
```

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS)
- Expo Go app on your phone (for testing) — [iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

```bash
git clone https://github.com/moseskanyandi/BookEase.git
cd BookEase
npm install
```

### Running the app

```bash
npx expo start
```

If testing across different networks (e.g. phone on mobile data, laptop on WiFi):

```bash
npx expo start --tunnel
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

## 📋 Project Status

🚧 In active development — Phase 1 (design) complete, Phase 2 (implementation) in progress.

## 📄 License

This project was built for educational purposes as part of a group internship project.