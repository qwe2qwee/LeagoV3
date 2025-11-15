# LeagoV3 🚗

<div align="center">

![Leago Logo](./assets/images/icon.png)

**Modern Cross-Platform Car Rental Application**

A feature-rich mobile application for car rental services, built with React Native and Expo.

[![React Native](https://img.shields.io/badge/React%20Native-0.76.6-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~52.0.26-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[Features](#features) • [Installation](#installation) • [Tech Stack](#tech-stack) • [Documentation](#project-structure)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**LeagoV3** is a comprehensive car rental platform that connects users with available vehicles for short-term and long-term rentals. The application provides a seamless experience for browsing, booking, and managing car rentals with integrated payment processing and real-time availability tracking.

### Platform Support
- ✅ **iOS** (iPhone & iPad)
- ✅ **Android** (Phone & Tablet)
- ✅ **Web** (Responsive PWA)

---

## ✨ Features

### 🔐 Authentication & User Management
- **Email/Password Authentication** with OTP verification
- **Phone Number Verification** via Authentica API
- **User Profile Management** with document uploads
- **Multi-language Support** (Arabic & English with RTL layout)

### 🚘 Car Browsing & Search
- **Advanced Search** with filters (brand, model, price, location)
- **Car Listings** with detailed specifications
- **Featured Cars** and promotional sections
- **Favorites/Likes** system for quick access
- **Car Details** with image galleries and rental rates

### 📅 Booking & Reservations
- **Flexible Rental Periods** (Daily, Weekly, Monthly rates)
- **Real-time Availability** tracking
- **Reservation Management** with booking history
- **Date & Time Selection** with custom pickers

### 💳 Payment Processing
- **Moyasar Payment Gateway** integration
- **Bill Management** and payment history
- **Multiple Payment Methods** support
- **Secure Transaction** handling

### 📍 Location Services
- **GPS-based Location** tracking
- **Map Integration** for car locations and branches
- **Geolocation Services** via GeoApify API
- **Branch Locator** for pickup/dropoff points

### 👤 User Profile
- **Personal Information** management
- **Address Management** (multiple addresses)
- **Document Upload** (ID, License, etc.)
- **Contact Preferences** settings
- **Language Toggle** (AR/EN)

---

## 🛠 Tech Stack

### Core Framework
```
React Native      0.76.6    Cross-platform mobile development
Expo             ~52.0.26   Universal React application framework
Expo Router      ~4.0.17    File-based routing system
TypeScript        5.3.3     Type-safe JavaScript
```

### State Management & Backend
```
Zustand           5.0.3     Lightweight state management
Appwrite          0.6.0     Backend-as-a-Service (BaaS)
```

### UI & Styling
```
NativeWind        4.1.23    Tailwind CSS for React Native
Tailwind CSS      3.4.17    Utility-first CSS framework
React Native      3.16.1    Smooth animations
Reanimated
Expo Vector Icons 14.0.2    Icon library
```

### Navigation
```
React Navigation   7.0.14    Native navigation
Bottom Tabs        7.2.0     Tab-based navigation
Expo Router        4.0.17    File-based routing
```

### Specialized Libraries
```
react-native-maps          1.18.0     Map integration
expo-location             18.0.5     GPS location services
react-native-webview      13.12.5    Web content display
expo-document-picker      13.0.2     File upload functionality
react-native-element-      2.12.4     Dropdown menus
dropdown
react-native-ui-datepicker 2.0.4      Custom date picker
react-native-modal        13.0.1     Modal dialogs
react-native-swiper        1.6.0      Image carousels
```

### Development Tools
```
Jest              29.2.1     Testing framework
ESLint            -          Code linting
Babel             7.25.2     JavaScript compiler
Metro             -          JavaScript bundler
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Expo CLI** - `npm install -g expo-cli`
- **Git** - Version control
- **iOS Simulator** (Mac only) - Via Xcode
- **Android Studio** - For Android emulator
- **Expo Go App** (Optional) - For physical device testing

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/qwe2qwee/LeagoV3.git
cd LeagoV3
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Appwrite Configuration
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_STORAGE_ID=your_storage_id

# API Keys
MOYASAR_API_KEY=your_moyasar_api_key
AUTHENTICA_API_KEY=your_authentica_api_key
GEOAPIFY_API_KEY=your_geoapify_api_key

# App Configuration
APP_ENV=development
```

---

## ⚙️ Configuration

### Appwrite Setup

1. Create an [Appwrite](https://appwrite.io/) account
2. Create a new project
3. Set up the following collections:
   - **users** - User profiles
   - **cars** - Car listings
   - **rentals** - Active rentals
   - **reservations** - Booking data
   - **documents** - User documents
   - **likes** - User favorites
   - **cards** - Payment cards
   - **branches** - Rental locations

4. Configure storage buckets for:
   - User documents
   - Car images
   - Profile pictures

### Payment Gateway (Moyasar)

1. Sign up for [Moyasar](https://moyasar.com/)
2. Get your API keys (Test & Live)
3. Configure webhook URLs for payment callbacks

### OTP Service (Authentica)

1. Register at [Authentica](https://authentica.io/)
2. Get API credentials
3. Configure SMS templates

---

## 🏃 Running the App

### Start Development Server
```bash
npx expo start
```

### Run on iOS Simulator
```bash
npx expo start --ios
```

### Run on Android Emulator
```bash
npx expo start --android
```

### Run on Web Browser
```bash
npx expo start --web
```

### Run on Physical Device
1. Install **Expo Go** from App Store or Play Store
2. Scan the QR code from terminal

---

## 📁 Project Structure

```
LeagoV3/
├── app/                          # Application screens (file-based routing)
│   ├── (tabs)/                  # Tab navigation screens
│   │   ├── index.tsx            # Home screen
│   │   ├── Search.tsx           # Search screen
│   │   ├── Bills.tsx            # Bills screen
│   │   └── Profile.tsx          # Profile screen
│   ├── (auth)/                  # Authentication flow
│   │   └── welcome/             # Welcome & auth screens
│   └── screens/                 # Nested screen routes
│       ├── Auth/                # Login, signup, OTP screens
│       ├── Bills/               # Payment screens
│       ├── Home/                # Car details, booking screens
│       └── profilePage/         # Profile management screens
│
├── components/                   # Reusable UI components
│   ├── Auth/                    # Authentication components
│   ├── Bills/                   # Payment UI components
│   ├── Home/                    # Home page components
│   ├── Profile/                 # Profile components
│   ├── Search/                  # Search components
│   ├── ui/                      # Shared UI elements
│   └── __tests__/               # Component tests
│
├── store/                        # Zustand state stores
│   ├── useAuthStore.ts          # Authentication state
│   ├── CarStore.ts              # Car listing state
│   ├── UserDetailsStore.ts      # User profile state
│   ├── UserDocsState.ts         # Documents state
│   └── SearchState.tsx          # Search filters state
│
├── lib/                         # Utility libraries
│   ├── appwrite/                # Appwrite backend integration
│   │   ├── config.js            # Appwrite configuration
│   │   ├── apit.ts              # API functions
│   │   └── useAppwrite.js       # Custom hooks
│   └── UpdatePhoneNumberAndSendOTP.ts
│
├── constants/                    # Application constants
│   ├── index.ts                 # Icons, colors, static data
│   ├── modelData.tsx            # Car models database
│   ├── modelToBrandMap.tsx      # Brand mapping
│   ├── Colors.ts                # Color palette
│   └── locationUtils.ts         # Location utilities
│
├── hooks/                        # Custom React hooks
│   ├── useColorScheme.ts        # Theme detection
│   └── useThemeColor.ts         # Theme colors
│
├── types/                        # TypeScript definitions
│   └── AppwriteTypes.ts         # Appwrite type definitions
│
├── assets/                       # Static assets
│   ├── images/                  # App images & icons
│   └── icons/                   # UI icons
│
├── scripts/                      # Build scripts
│   └── reset-project.js         # Project reset utility
│
└── Configuration Files
    ├── package.json             # Dependencies & scripts
    ├── app.json                 # Expo configuration
    ├── eas.json                 # Expo Application Services
    ├── tailwind.config.js       # Tailwind configuration
    ├── tsconfig.json            # TypeScript configuration
    ├── babel.config.js          # Babel configuration
    ├── metro.config.js          # Metro bundler config
    ├── postcss.config.js        # PostCSS configuration
    └── .eslintrc.js             # ESLint rules
```

---

## 🗄 State Management

The application uses **Zustand** for global state management with the following stores:

### Authentication Store (`useAuthStore.ts`)
```typescript
- User session management
- Login/logout functionality
- User profile data
- Authentication tokens
```

### Car Store (`CarStore.ts`)
```typescript
- Current selected car
- Car details and specifications
- Rental type selection
- Car availability status
```

### User Details Store (`UserDetailsStore.ts`)
```typescript
- Personal information
- Address management
- Contact preferences
- Language settings
```

### User Documents Store (`UserDocsState.ts`)
```typescript
- Uploaded documents
- Document verification status
- Document management
```

### Search Store (`SearchState.tsx`)
```typescript
- Active search filters
- Search query
- Filter preferences
```

---

## 🔌 API Integration

### Appwrite Backend

**Collections:**
- `users` - User profiles and authentication
- `cars` - Vehicle inventory
- `rentals` - Active rental records
- `reservations` - Booking management
- `documents` - User document storage
- `likes` - User favorites
- `cards` - Payment methods
- `branches` - Rental locations

**Storage Buckets:**
- User documents (ID, license, etc.)
- Car images and galleries
- User profile pictures

### External APIs

1. **Moyasar Payment Gateway**
   - Payment processing
   - Transaction management
   - Refund handling

2. **Authentica OTP Service**
   - Phone number verification
   - SMS OTP delivery
   - Security validation

3. **GeoApify Geolocation**
   - Address geocoding
   - Location search
   - Reverse geocoding

---

## 📱 App Features by Screen

### 🏠 Home Screen
- Featured car listings
- Promotional ad sections
- Quick search access
- Popular car categories
- Special offers

### 🔍 Search Screen
- Advanced car search
- Brand/model filters
- Price range selection
- Location-based search
- Availability filtering

### 💰 Bills Screen
- Payment history
- Active bills
- Payment method management
- Invoice download
- Transaction details

### 👤 Profile Screen
- Personal information editing
- Document management
- Address book
- Language preferences
- Contact settings
- Terms & conditions
- Privacy policy

---

## 🎨 Styling & Theming

The app uses **NativeWind** (Tailwind CSS for React Native) with support for:

- **Light/Dark Mode** - Automatic system detection
- **RTL Layout** - Full Arabic language support
- **Custom Color Scheme** - Brand colors (#FF5C39 primary)
- **Responsive Design** - Adaptive layouts for all devices
- **Custom Fonts** - Montserrat and Zain font families

### Color Palette
```typescript
Primary:    #FF5C39  (Orange)
Secondary:  #374151  (Gray)
Background: #FFFFFF  (Light) / #1F2937 (Dark)
Text:       #111827  (Light) / #F9FAFB (Dark)
```

---

## 🧪 Testing

### Run Tests
```bash
npm test
# or
yarn test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Test Structure
- Unit tests for components in `components/__tests__/`
- Integration tests for screens
- API mocking for Appwrite calls

---

## 🚢 Deployment

### Build for Production

#### iOS (via EAS)
```bash
eas build --platform ios
```

#### Android (via EAS)
```bash
eas build --platform android
```

#### Web
```bash
npx expo export:web
```

### Publish Updates (OTA)
```bash
eas update --branch production
```

### App Store Submission
1. Build production version
2. Test on physical devices
3. Prepare app store assets
4. Submit via App Store Connect (iOS) or Play Console (Android)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow ESLint rules
- Use TypeScript for new files
- Write tests for new features
- Follow existing naming conventions

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

- **Package Name**: `com.qwe2qwe.leagoV3`
- **Version**: Check `package.json`
- **Repository**: [LeagoV3](https://github.com/qwe2qwee/LeagoV3)

### Report Issues
If you encounter any issues, please file a bug report on our [GitHub Issues](https://github.com/qwe2qwee/LeagoV3/issues) page.

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - Universal React framework
- [Appwrite](https://appwrite.io/) - Backend as a Service
- [NativeWind](https://www.nativewind.dev/) - Tailwind for React Native
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

<div align="center">

**Made with ❤️ by the Leago Team**

⭐ Star us on GitHub — it helps!

[Website](https://leago.com) • [Documentation](https://docs.leago.com) • [Support](https://support.leago.com)

</div>
