import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR6XCzMYHNpH35vncS8M4nfh0GYSR60us",
  authDomain: "prepwise-ca5d1.firebaseapp.com",
  projectId: "prepwise-ca5d1",
  storageBucket: "prepwise-ca5d1.firebasestorage.app",
  messagingSenderId: "566303113251",
  appId: "1:566303113251:web:d8cda0cfe893bfb78b7196",
  measurementId: "G-9TKMYPW6Y6",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
