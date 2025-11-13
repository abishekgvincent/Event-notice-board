# 📌 IT Noticeboard App  
A React Native (Expo) app for managing **Events** and **Circulars** for the IT Department.

This mobile application serves as a **centralized noticeboard** for the Department of Information Technology.  
Students can easily view **upcoming events**, **past events**, **current circulars**, and **previous circulars** all updated in real-time using **Firebase Firestore**.

---

## Features

### 🔹 Home Page (EntryPage)
- Clean UI with department branding  
- Quick navigation to Events & Circulars  
- Light/Dark mode support  

### 🔹 Events Page
- Fetches events from Firestore (`events` collection)  
- Automatically sorts events by date  
- Separates **Upcoming Events** and **Previous Events**  
- Supports:
  - Description  
  - Images  
  - Date range  
  - Time & venue  
  - External links  
- Modal to show detailed event info  
- Pull-to-refresh  
- Realtime updates via **onSnapshot**

### 🔹 Circulars Page
- Fetches circulars from Firestore (`circulars` collection)  
- Displays:
  - Title  
  - Date  
  - Description  
  - Image  
  - External links  
- Categories:
  - **Current Circulars**  
  - **Past Circulars**  
- Modal view for circular details  
- Pull-to-refresh  
- Realtime updates  

### 🔹 App-Wide Theme System
- Toggle between **Dark Mode** and **Light Mode**  
- Theme applied across all screens  
- Header icon for switching themes  

---

##  Tech Stack

### **Frontend**
- React Native (Expo)  
- React Navigation  
- Context API (Theme Management)  
- FontAwesome Icons  

### **Backend**
- Firebase  
  - Firestore (Events & Circulars storage)

---

---

| Home                                                                                 | Events                                                                               | Circulars                                                                            | Modal                                                                                |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![](https://github.com/user-attachments/assets/37b0f503-1cdc-4101-9e05-642b45289291) | ![](https://github.com/user-attachments/assets/c38e7806-e386-4d60-9346-9682ddcbcf68) | ![](https://github.com/user-attachments/assets/2bc3b6b0-b53f-458e-883f-339decaedef1)) |  ![](https://github.com/user-attachments/assets/1f40ecae-46fd-4c7a-9bd3-4951ba77327f) |



##  Firebase Setup

1. Create a Firebase project  
2. Enable Firestore  
3. Create the following collections:
   - `events`
   - `circulars`  
4. Add your Firebase config inside `firebase.js`:

```js
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

📜 License

This project is open-source and free to use.
