# IT Noticeboard App
A React Native (Expo) app for managing Events and Circulars for the IT Department

This mobile application serves as a centralized noticeboard for the Department of Information Technology.
Students can easily view upcoming events, past events, current circulars, and previous circulars — all updated in real-time using Firebase Firestore.

## Features
### Home Page (EntryPage)

Clean UI with department branding

Quick navigation to Events & Circulars

Light/Dark mode support

### Events Page

Fetches events from Firestore (events collection)

Sorts events by date automatically

Separates Upcoming Events and Previous Events

Supports:

Description

Images

Date range

Time & venue

External links (open in browser)

Modal to show full event details

Pull-to-refresh

Realtime updates via onSnapshot

### Circulars Page

Fetches circulars from Firestore (circulars collection)

Shows:

Title

Date

Description

Image

External links

Categories:

Current Circulars

Past Circulars

Modal view for details

Pull-to-refresh

Realtime updates

### App-Wide Theme

Toggle between Dark Mode and Light Mode

Colors adapt across all screens

Header icon for theme switching

## Tech Stack
Frontend

React Native (Expo)

React Navigation

Context API (Theme Management)

Vector Icons (FontAwesome)

Backend

Firebase

Firestore (for Events & Circulars)

📁 Project Structure
IT-Noticeboard/
│── App.js
│── index.js
│── ThemeContext.js
│── firebase.js
│── EntryPage.js
│── EventsPage.js
│── CircularsPage.js
│── app.json
│── assets/
│     ├── srm-logo.png
│     ├── icon.png
│     ├── adaptive-icon.png
│     ├── splash-icon.png

## Firebase Setup

Create a Firebase project

Enable Firestore

Create two collections:

events

circulars

Fill firebaseConfig inside firebase.js:

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};


📦 Installation & Running
1. Clone the repository
git clone https://github.com/your-username/it-noticeboard.git
cd it-noticeboard

2. Install dependencies
npm install

3. Start the Expo app
npx expo start

4. Run on device/emulator

Press a → Android emulator

Press i → iOS simulator

Scan QR using Expo Go app

📸 Screenshots:
![IMG_20250913_195651](https://github.com/user-attachments/assets/37b0f503-1cdc-4101-9e05-642b45289291)
![IMG_20250913_195741](https://github.com/user-attachments/assets/c38e7806-e386-4d60-9346-9682ddcbcf68)
![IMG_20250913_200119](https://github.com/user-attachments/assets/1f40ecae-46fd-4c7a-9bd3-4951ba77327f)
![IMG_20250913_195847](https://github.com/user-attachments/assets/2bc3b6b0-b53f-458e-883f-339decaedef1)



📜 License

This project is open-source and free to use.
